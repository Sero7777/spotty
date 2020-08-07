import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"
import { logIn, getSpots } from "../actions/index"
import ActionBar from "./ActionBar"

const Header = (props) => {
    const onSubmit = async formValues => {
        const res =  await props.logIn(formValues)

        if (res.status == 200) props.getSpots()
    }

    const loginBar = (props) => {
        switch (props.loggedIn) {
            case true:
                return <ActionBar />
            default:
                return <LoginForm onSubmit={onSubmit} />
        }
    }

    return (
        <header className="header">
            <Link to="/">
                <img src="#" alt="Spotty logo" className="header__logo mg-left-s" />
            </Link>
            <div className="header__logo-name">Spotty</div>
            {loginBar(props)}
        </header>
    )
}

const mapStateToProps = state => {
    return { loggedIn: state.user.username !== null ? true : false };
};

export default connect(mapStateToProps, { logIn, getSpots })(Header)