import React, { useState } from "react";
import Modal from "./Modals/Modal"
import SpotItemModal from "./Modals/SpotItemModal"
import UpdateItemModal from "./Modals/UpdateSpotModal"
import DeleteSpotModal from "./Modals/DeleteSpotModal"

const SpotItem = (props) => {
    const [spotModalTriggered, setSpotModalTriggered] = useState(false)
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

    const userActionButtons = (
        <>
            <button onClick={e => onUpdateClickHandler(e)}>
                Update
        </button>
            <button onClick={e => onDeleteClickHandler(e)}>
                Delete
        </button>
        </>
    )

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
                    <DeleteSpotModal spotId={props.spot.id} onDismiss={() => setDeleteSpotModal(false)}/>
                </Modal>
            )
        }
        return null
    }

    const triggerdSpotModal = () => {
        if (spotModalTriggered) {
            return (
                <Modal onDismiss={() => { setSpotModalTriggered(false) }} title={props.spot.title}>
                    <SpotItemModal spot={props.spot} onDismiss={() => setSpotModalTriggered(false)} />
                </Modal>
            )
        }
        return null
    }

    return (
        <>
            <div className="spots__content__item" onClick={() => setSpotModalTriggered(true)}>
                <img src={props.spot.pic} alt="img pic" className="spots__content__item-pic" onError={(ev) => ev.target.src = fallbackImgUrl} />
                <div className="spots__content__item--user-actions">
                    <div>
                        {props.spot.comments.length} Comments
                    </div>
                    {props.spot.username === props.username ? userActionButtons : null}
                </div>
                <div className="spots__content__item-caption"><span>{props.spot.title}</span></div>
                <div className="spots__content__item-rating"><span className="spots__content__item-rating-value">{props.spot.rating} </span>Upvotes</div>
                <div className="spots__content__item-description">{props.spot.description}</div>
            </div>
            {triggerdSpotModal()}
            {triggerUpdateSpotModal()}
            {triggerDeleteModal()}
        </>

    )
}

export default SpotItem;