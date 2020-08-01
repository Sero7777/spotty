import React, { useEffect } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie"
import { getUser, getSpots } from "../actions/index"
import { connect } from "react-redux"

import Register from "./Register";
import Header from "./Header";
import Impressum from "./Impressum";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Profile from "./Profile/Profile"
import ListView from "./ListView"

const App = (props) => {

    useEffect(() => {
        // login if cookie exists
        if (Cookies.get("express:sess")) {
            console.log("exists")
            props.getUser()
        } else {
            console.log("doesnt exist")
        }

        // get Spots initially
        console.log("Fetching spots ...")
        props.getSpots()
    }, [])

    return (
        < BrowserRouter >
            <div className="container">
                <Header />
{/*                 
                <PublicRoute exact path="/register" component={Register}/>
                <Route exact path="/register" component={Register}/>

                <PrivateRoute exact path="/impressum" component={Impressum}/>
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route exact path="/">
                    <Redirect to="/register" />
                </Route> */}

                <Route exact path="/list" component={ListView} />
            </div>
        </BrowserRouter>
    )
}

export default connect(null, { getUser, getSpots })(App);