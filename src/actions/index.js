import db, {
  addDoc,
  auth,
  collection,
  provider,
  signInWithPopup,
  signOut,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getDocs,
} from "../firebase";
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER,  } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
})

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUser(user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      console.log(payload.image.type);

      const metadata = {
        contentType: payload.image.type,
      };

      const storageRef = ref(storage, `images/${payload.image.name}`);
      const upload = uploadBytesResumable(storageRef, payload.image, metadata);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`);
          }
        },

        (error) => console.log(error.code),

        async () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            const docRef = addDoc(collection(db, "articles"), {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
            });
            console.log("Document written with ID: ", docRef.id);
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      const docRef = addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticlesAPI() {
  return async (dispatch) => {
    let payload = [];
    const querySnapshot = await getDocs(collection(db, "articles"));
    querySnapshot.forEach((doc) => {
      payload.push(doc.data());
    });
    dispatch(getArticles(payload));
  };
}
