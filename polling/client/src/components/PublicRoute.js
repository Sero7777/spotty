import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PublicRoute = ({ component: Component, ...rest }) => {
    console.log(rest)
    return <Route
        {...rest}
        render={props =>
            rest.loggedIn ? (
                <Redirect
                    to={{
                        pathname: "/profile",
                        state: { from: props.location }
                    }}
                />
            ) : (
                    <Component {...props} />
                )}
    />
}

const mapStateToProps = state => {
    return { loggedIn: state.user.username !== null ? true : false }
}

export default connect(mapStateToProps)(PublicRoute)