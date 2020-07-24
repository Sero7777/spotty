import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"
import { logIn } from "../actions/index"
import ActionBar from "./ActionBar"

const Header = (props) => {
    const onSubmit = async formValues => {
        return await props.logIn(formValues)
    }

    const loginBar = (props) => {
        switch (props.loggedIn) {
            case true:
                console.log("Activated ACB")
                return <ActionBar />
            default:
                console.log("Activated LGF")
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

export default connect(mapStateToProps, { logIn })(Header)