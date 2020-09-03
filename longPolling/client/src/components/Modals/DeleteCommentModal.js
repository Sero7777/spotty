import React from "react";
import { deleteComment } from "../../actions/index"

const DeleteCommentModal = (props) => {

    const onSubmit = async () => {
        const status = await deleteComment({ id: props.comment._id })

        if (status === 200) props.onDismiss()

        else console.log("Something went wrong")
    }

    return (
        <div className="updateCommentModal__container">
            <div className="updateCommentModal__comment mg-bottom-m">
                <div className="updateCommentModal__comment--username">
                    <span className="pd-left-xs">{props.comment.username}</span> wrote:
            </div>
                <div className="updateCommentModal__comment--content">
                    {props.comment.content}
                </div>
            </div>
            <div className="deleteModal__container">
                <div className="deleteModal__text mg-bottom-s">
                    Do you really want to delete this comment?
            </div>
                <div className="deleteModal__btns">
                    <button type="button" onClick={props.onDismiss}>Cancel</button>
                    <button type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCommentModal;
