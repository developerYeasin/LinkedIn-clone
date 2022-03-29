import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

const App = (props) => {
  useEffect(() => {
    props.getUserAuth();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home /> 
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


const mapStateToProps = (state) => {
  return{};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default  connect(mapStateToProps, mapDispatchToProps)(App);
