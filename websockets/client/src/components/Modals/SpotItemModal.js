import React, { useState } from "react";
import CommentsList from "../CommentsList"
import Comment from "../Comment"
import { createComment } from "../../actions/index"
import { connect } from "react-redux"
import Modal from "./Modal"
import UpdateItemModal from "./UpdateSpotModal"
import DeleteSpotModal from "./DeleteSpotModal"

const SpotItemModal = (props) => {
    const [content, setContent] = useState("")
    const [updateSpotModal, setUpdateSpotModal] = useState(false)
    const [deleteSpotModal, setDeleteSpotModal] = useState(false)
    const fallbackImgUrl = "https://ephemerica.kfstock.at/wp-content/themes/koji/assets/images/default-fallback-image.png"

    const onUpdateClickHandler = (e) => {
        e.stopPropagation()
        setUpdateSpotModal(true)
    }

    const onDeleteClickHandler = (e) => {
        e.stopPropagation()
        setDeleteSpotModal(true)
    }

    const triggerUpdateSpotModal = () => {
        if (updateSpotModal) {
            return (
                <Modal onDismiss={() => { setUpdateSpotModal(false) }} title={props.spot.title}>
                    <UpdateItemModal spot={props.spot} onDismiss={() => setUpdateSpotModal(false)} />
                </Modal>
            )
        }
        return null
    }

    const triggerDeleteModal = () => {
        if (deleteSpotModal) {
            return (
                <Modal onDismiss={() => { setDeleteSpotModal(false) }} title={props.spot.title}>
                    <DeleteSpotModal spotId={props.spot.id} onDismiss={() => setDeleteSpotModal(false)} onSubmit={props.onDismiss} />
                </Modal>
            )
        }
        return null
    }

    const spotsActionButtons = (
        <div className="spotModal__actions pd-bottom-xs pd-top-xs">
            <button onClick={e => onUpdateClickHandler(e)}>Update Spot</button>
            <button onClick={e => onDeleteClickHandler(e)}>Delete Spot</button>
        </div>
    )

    const renderComments =
        props.spot !== undefined ?
            props.spot.comments.map(comment => {
                return (
                    <li key={comment._id}>
                        <Comment comment={comment} />
                    </li>
                )
            }) :
            null

    const commentsList = (
        <CommentsList>
            {renderComments}
        </CommentsList>)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (content.trim().length !== 0) {
            const status = await createComment({ content, spotId: props.spot.id })

            if (status === 201) setContent("")

            else console.log("something went wrong")
        } else {
            setContent("")
        }
    }

    return (
        <>
            <div className="spotModal__container">
                <div className="spotModal__pic pd-bottom-xs">
                    <img src={props.spot !== undefined ? props.spot.pic : fallbackImgUrl} alt="img pic" onError={(ev) => ev.target.src = fallbackImgUrl} />
                </div>

                <div className="spotModal__description pd-bottom-xs pd-top-xs">
                    {props.spot !== undefined ? props.spot.description : "Deleted Spot"}
                </div>

                <div className="spotModal__category-upvotes pd-bottom-xs pd-top-xs">
                    <div className="spotModal__category-upvotes--category">
                        {props.spot !== undefined ? props.spot.category : "Deleted Spot"}
                    </div>
                    <div className="spotModal__category-upvotes--upvotes pd-left-xs">
                        {props.spot !== undefined ? props.spot.upvotes + "Upvotes": "Deleted Spot"}
                </div>
                </div>


                <div className="spotModal__adress-username pd-bottom-xs pd-top-xs">
                    <div className="spotModal__adress-username--adress">
                        {props.spot !== undefined ?
                            <>
                                <p>{props.spot.streetname}</p>
                                <p>{props.spot.zip} {props.spot.city}</p>
                                <p>{props.spot.country}</p>
                            </>
                            :
                            "Deleted Spot"}
                    </div>
                    <div className="spotModal__adress-username--username">
                        {props.spot !== undefined ? <p className="spotModal__adress-username--username--createdBy">Created By</p> : null}
                        <p>{props.spot !== undefined ? props.spot.username : "Deleted Spot"}</p>
                    </div>
                </div>


                {props.spot !== undefined && props.username === props.spot.username ? spotsActionButtons : null}

                {props.spot !== undefined && props.spot.comments.length > 0 ? commentsList : null}

                {props.spot !== undefined ? 
                <div className="comment__input mg-top-xs mg-bottom-s">
                    <form onSubmit={handleSubmit}>
                        <textarea type="text" placeholder="Enter a Comment" value={content} onChange={e => setContent(e.target.value)} />
                        <button>Submit</button>
                    </form>
                </div> 
                : null}
            </div>
            {triggerUpdateSpotModal()}
            {triggerDeleteModal()}
        </>
    )
}

const mapStateToProps = state => {
    return { username: state.user.username };
};

export default connect(mapStateToProps)(SpotItemModal)
