import React from "react";

const CommentsList = (props) => {
    return (
        <div className="spots__list">
            {props.children}
        </div>
    )
}

export default CommentsList;