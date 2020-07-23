import React from "react";

const SpotItem = (props) => {
    return (
        <div className="spots__content__item">
            <img src={props.imgUrl} alt="img pic" className="spots__content__item-pic" />
            <div className="spots__content__item-author">{props.author}</div>
            <div className="spots__content__item-caption"><span>{props.caption}</span></div>
            <div className="spots__content__item-rating"><span className="spots__content__item-rating-value">{props.rating} </span>Upvotes</div>
            <div className="spots__content__item-description">{props.description}</div>
        </div>
    )
}

export default SpotItem;