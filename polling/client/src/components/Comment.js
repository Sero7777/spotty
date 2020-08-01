import React from "react";

const Comment = (props) => {
    return (
        <div className="comment__container">
            <div className="comment__username"><span>username</span> wrote:</div>
            <div className="comment__content">content</div>
        </div>
    )
}

export default Comment;