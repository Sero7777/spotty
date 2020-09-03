import React, { useState } from "react";
import Modal from "./Modals/Modal"
import SpotItemModal from "./Modals/SpotItemModal"

const SpotItem = (props) => {
    const [spotModalTriggered, setSpotModalTriggered] = useState(false)

    const fallbackImgUrl = "https://ephemerica.kfstock.at/wp-content/themes/koji/assets/images/default-fallback-image.png"

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
                    <span></span>
                    <div>
                        {props.spot.upvotes} Upvotes
                    </div>
                </div>
                <div className="spots__content__item-caption"><span>{props.spot.title}</span></div>
                <div className="spots__content__item-description">{props.spot.description}</div>
            </div>
            {triggerdSpotModal()}
        </>

    )
}

export default SpotItem;