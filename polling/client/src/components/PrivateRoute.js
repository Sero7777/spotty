import React, { Component } from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest)
    return <Route
        {...rest}
        render={props =>
            rest.loggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/register",
                            state: { from: props.location }
                        }}
                    />
                )}
    />
}

const mapStateToProps = state => {
    return { loggedIn: state.user.username !== null ? true : false }
}

export default connect(mapStateToProps)(PrivateRoute)