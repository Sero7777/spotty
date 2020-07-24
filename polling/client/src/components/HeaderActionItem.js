import React from "react";

const HeaderActionItem = (props) => {
    return (
        <a className="header__loggedIn__item" onClick={props.clickAction}>
            {props.itemText}
        </a>
    )
}

export default HeaderActionItem;
