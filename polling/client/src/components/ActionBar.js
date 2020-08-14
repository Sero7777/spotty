import React, { useState } from "react"
import ActionItem from "./HeaderActionItem"
import { connect } from "react-redux"
import { logOut, changeView } from "../actions/index"
import Modal from "./Modals/Modal"
import AddSpotModal from "./Modals/AddSpotModal"
import { Link } from "react-router-dom";

const ActionBar = (props) => {
    const [addModalTriggered, setAddModalTriggered] = useState(false)

    const triggerAddModal = () => {
        if (addModalTriggered) {
            return (
                <Modal onDismiss={() => { setAddModalTriggered(false) }} title="Add Spot">
                    <AddSpotModal onDismiss={() => setAddModalTriggered(false)} />
                </Modal>
            )
        }
        return null
    }

    const onLogout = () => {
        props.logOut()
    }

    return (
        <div className="header__loggedIn mg-right-xl">
            <ActionItem itemText="Add" clickAction={() => { setAddModalTriggered(true) }} />

            {props.listView ?
                <Link to="/list" className="header__loggedIn__item" onClick={() => props.changeView()}>List</Link> :
                <Link to="/map" className="header__loggedIn__item" onClick={() => props.changeView()}>Map</Link>
            }
            <div className="header__loggedIn__username header__loggedIn__item pd-left-l pd-right-l">{props.username}</div>

            <button onClick={onLogout} className="header__logout-button mg-left-s pd-left-xs pd-right-xs">Logout</button>
            {triggerAddModal()}
        </div>
    )
}

const mapStateToProps = state => {
    return { username: state.user.username, listView: state.listView };
};

export default connect(mapStateToProps, { logOut, changeView })(ActionBar)