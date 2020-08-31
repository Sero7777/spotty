import React, { useEffect } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie"
import { getUser, getSpots } from "../actions/index"
import { connect } from "react-redux"

import Register from "./Register";
import Header from "./Header";
import Impressum from "./Impressum";
import ListView from "./ListView"
import MapView from "./MapView"

const App = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            if (Cookies.get("express:sess")) {
                await props.getUser()

                console.log("Fetching spots ...")
                await props.getSpots()
            }
        }
        fetchData()

        window.mapkit.init({
            authorizationCallback: function (done) {
                fetch("http://spotty.com/api/maptoken")
                    .then((response) => response.json())
                    .then((result) => {
                        done(result.token);
                    });
            },
        })

        const interval = setInterval(async () => {
            await props.getSpots()
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        < BrowserRouter >
            <div className="container">
                <Header />
                <Route exact path="/" component={Register}>
                    {props.auth ? <Redirect to="/list" /> : null}
                </Route>
                <Route exact path="/register" component={Register}>
                    {props.auth ? <Redirect to="/list" /> : null}
                </Route>
                <Route exact path="/impressum" component={Impressum} />
                <Route exact path="/list" component={ListView}>
                    {props.auth ? null : <Redirect to="/register" />}
                </Route>
                <Route exact path="/map" component={MapView} />
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = state => {
    return { auth: state.user.username !== null ? true : false }
}

export default connect(mapStateToProps, { getUser, getSpots })(App);