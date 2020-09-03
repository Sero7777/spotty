import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rest)
    return <Route
        {...rest}
        render={props =>
            props.auth ? <Component {...props} /> : <Redirect to="/" />}
    />
}

const mapStateToProps = state => {
    console.log(state.user.username !== null ? true : false)
    return { auth: state.user.username !== null ? true : false }
}

export default connect(mapStateToProps)(PrivateRoute)