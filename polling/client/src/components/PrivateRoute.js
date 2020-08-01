import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log("is logged in?: " + rest.loggedIn)
    return <Route
        {...rest}
        render={props =>
            rest.loggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/impressum",
                            state: { from: props.location }
                        }}
                    />
                )}
    />
}

const mapStateToProps = state => {
    console.log(state.user.username !== null ? true : false)
    return { loggedIn: state.user.username !== null ? true : false }
}

export default connect(mapStateToProps)(PrivateRoute)