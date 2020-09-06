import React, { useEffect, useRef } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie"
import { getUser, getSpots, connectToQueryService } from "../actions/index"
import { connect } from "react-redux"

import Register from "./Register";
import Header from "./Header";
import Impressum from "./Impressum";
import ListView from "./ListView"
import MapView from "./MapView"

export let geocoder;

const App = (props) => {

    let loggedIn = useRef(props.auth)

    useEffect(() => {
        const fetchData = async () => {
            if (Cookies.get("express:sess")) {
                await props.getUser()

                console.log("Fetching spots ...")
                await props.getSpots()
            }
        }

        if (props.auth) {
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

            geocoder = new window.mapkit.Geocoder()
        }
    }, [])

    useEffect(() => {
        loggedIn.current = props.auth
        const connectToQueryService = async () => {
            const resStatus = await props.connectToQueryService()

            if (resStatus === 200 || resStatus == 502) {
                if (loggedIn.current) connectToQueryService()
            }
            else setTimeout(() => {
                if (loggedIn.current) connectToQueryService()
            }, 1000);
        }

        if (loggedIn.current) {
            connectToQueryService()
        }
    }, [props.auth])

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

export default connect(mapStateToProps, { getUser, getSpots, connectToQueryService })(App);