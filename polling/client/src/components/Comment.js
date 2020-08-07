import React, {useState} from "react";
import {connect} from "react-redux"
import CommentModal from "./Modals/CommentModal"
import UpdateCommentModal from "./Modals/UpdateCommentModal"
import DeleteCommentModal from "./Modals/DeleteCommentModal"

const Comment = (props) => {
    const [updateCommentModal, setUpdateCommentModal] = useState(false)
    const [deleteCommentModal, setDeleteCommentModal] = useState(false)

    const onUpdateClickHandler = (e) => {
        e.stopPropagation()
        setUpdateCommentModal(true)
    }

    const onDeleteClickHandler = (e) => {
        e.stopPropagation()
        setDeleteCommentModal(true)
    }

    const userActionButtons = (
        <div className="comment--user-actions">
            <button onClick={(e) => onUpdateClickHandler(e)}>
                Update
        </button>
            <button onClick={(e) => onDeleteClickHandler(e)}>
                Delete
        </button>
        </div>
    )

    const triggerUpdateCommentModal = () => {
        if (updateCommentModal) {
            return (
                <CommentModal onDismiss={() => { setUpdateCommentModal(false) }} title="Updating a Comment ...">
                    <UpdateCommentModal comment={props.comment} onDismiss={() => setUpdateCommentModal(false)} />
                </CommentModal>
            )
        }
        return null
    }

    const triggerDeleteCommentModal = () => {
        if (deleteCommentModal) {
            return (
                <CommentModal onDismiss={() => { setDeleteCommentModal(false) }} title="Deleting a Comment ...">
                    <DeleteCommentModal comment={props.comment} onDismiss={() => setDeleteCommentModal(false)} />
                </CommentModal>
            )
        }
        return null
    }

    return (
        <div className="comment__container mg-top-xs">
            <div className="comment__username">
                <div className="pd-left-xs"><span>{props.comment.username}</span> wrote:</div>
                {props.comment.username === props.username ? userActionButtons : null}
            </div>
            <div className="comment__content">{props.comment.content}</div>
            {triggerUpdateCommentModal()}
            {triggerDeleteCommentModal()}
        </div>
    )
}

const mapStateToProps = state => {
    return { username: state.user.username };
};

export default connect(
    mapStateToProps,
)(Comment)