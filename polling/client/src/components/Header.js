import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src="#" alt="Spotty logo" className="header__logo mg-left-s" />
            </Link>
            <div className="header__logo-name">Spotty</div>
            <form className="mg-right-xl" onSubmit={e => e.preventDefault()}>
                <input type="text" className="mg-right-s" placeholder="email" />
                <input type="text" className="mg-right-s" placeholder="password" />
                <button className="header__login__btn">Login</button>
            </form>
        </header>
    )
}

export default Header;