import React, { useEffect } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie"
import { getUser } from "../actions/index"
import { connect } from "react-redux"

import Register from "./Register";
import Header from "./Header";
import Impressum from "./Impressum";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

const App = (props) => {

    useEffect(() => {
        if (Cookies.get("express:sess")) {
            console.log("exists")
            props.getUser()
        } else {
            console.log("doesnt exist")
        }
    }, [])

    return (
        < BrowserRouter >
            <div className="container">
                <Header />
                <Route exact path="/">
                    <Redirect to="/register" />
                </Route>
                <PublicRoute exact path="/register" component={Register}/>
                <PrivateRoute exact path="/impressum" component={Impressum}/>
            </div>
        </BrowserRouter>
    )
}

export default connect(null, { getUser })(App);