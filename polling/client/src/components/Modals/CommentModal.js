import React from "react";
import {createPortal} from "react-dom";

const CommentModal = (props) => {
    return createPortal(
        <div onClick={props.onDismiss} className="modal__overlay--comments"> 
            <div onClick={e => e.stopPropagation()} className="modal--comments">
                <header className="modal__header">
                    <h1>{props.title}</h1>
                    <button className="modal__header__close-button" onClick={props.onDismiss}>x</button>
                </header>
                <div className="modal__content">
                    {props.children}
                </div>
            </div>
        </div>,
        document.querySelector("#commentsModal")
    )
}

export default CommentModal;