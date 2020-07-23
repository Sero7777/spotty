import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"
import {logIn} from "../actions/index"

const Header = (props) => {
    const onSubmit = async formValues => {
        return await props.logIn(formValues)
    }
    
    const loginBar = (props) => {
        switch (props.loggedIn){
            case true:
                return <div>Hallo welt</div>
            default:
                return <LoginForm onSubmit={onSubmit}/>
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
    return { loggedIn: state.user !== null ? true : false };
};

export default connect(mapStateToProps, {logIn})(Header)