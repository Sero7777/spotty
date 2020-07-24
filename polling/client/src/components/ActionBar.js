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
            <div className="header__loggedIn__username header__loggedIn__item mg-left-s mg-right-s">{props.username}</div>

            <button onClick={onLogout} className="header__logout-button mg-left-s pd-left-xs pd-right-xs">Logout</button>
        </div>
    )
}

const mapStateToProps = state => {
    return { username: state.user.username };
};

export default connect(mapStateToProps, { logOut })(ActionBar)