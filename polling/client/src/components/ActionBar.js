import React from "react"
import ActionItem from "./HeaderActionItem"
import { connect } from "react-redux"
import { logOut } from "../actions/index"

const ActionBar = (props) => {
    const onLogout = () => {
        props.logOut()
    }
    return (
        <div className="header__loggedIn mg-right-xl">
            <ActionItem itemText="Add" />
            <ActionItem itemText="Filter" />
            <ActionItem itemText="List" />

            <button onClick={onLogout} className="header__logout-button mg-left-s pd-left-xs pd-right-xs">Logout</button>
        </div>

    )
}

export default connect(null, { logOut })(ActionBar)