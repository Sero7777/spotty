import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"
import { logIn, getSpots } from "../actions/index"
import ActionBar from "./ActionBar"
import logo_spotty from "../assets/logo-spotty.png";


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
            <Link to="/" className="header__logo__container">
                <img src={logo_spotty} alt="Spotty logo" className="header__logo mg-left-s" />
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