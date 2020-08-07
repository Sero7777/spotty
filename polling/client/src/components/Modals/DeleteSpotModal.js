import React from "react";
import { deleteSpot } from "../../actions/index"

const DeleteSpotModal = (props) => {

    const onSubmit = async () => {
        const status = await deleteSpot({ id: props.spotId })

        if (status === 200) props.onDismiss()

        else console.log("Something went wrong")
    }

    return (
        <div className="deleteModal__container">
            <div className="deleteModal__text mg-bottom-s">
                Do you really want to delete this spot?
            </div>
            <div className="deleteModal__btns">
                <button type="button" onClick={props.onDismiss}>Cancel</button>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default DeleteSpotModal;
