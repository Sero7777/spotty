import React from "react";
import { connect } from "react-redux"
import CommentsList from "../CommentsList"
import Comment from "../Comment"

// spotId = specific spot id, spots = all spots
// use array.find() method
const SpotItemModal = (props) => {
    return (
        <div className="spotModal__container">
            <div className="spotModal__pic">
                {/* TODO: fix broken image sizing */}
                {/* <img src="https://www.photocircle.net/de/photos/thumbnails/zoom/43751-Berlin-Skyline-Oberbaumbrcke--by-jean-claude-castor.jpg" alt="img pic" /> */}
                Pic
            </div>
            <div className="spotModal__description pd-bottom-xs pd-top-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore cum nam, alias similique quos adipisci cupiditate enim facilis delectus rerum nulla reiciendis illum, aliquam mollitia veniam officiis perferendis aliquid fugit.</div>

            <div className="spotModal__category-upvotes pd-bottom-xs pd-top-xs">
                <div className="spotModal__category-upvotes--category">
                    Entertainment
                </div>
                <div className="spotModal__category-upvotes--upvotes pd-left-xs">
                    28 Upvotes
                </div>
            </div>


            <div className="spotModal__adress-username pd-bottom-xs pd-top-xs">
                <div className="spotModal__adress-username--adress">
                    <p>Frankfurter Allee 34</p>
                    <p>10247 Berlin</p>
                    <p>Germany</p>
                </div>
                <div className="spotModal__adress-username--username">
                    <p className="spotModal__adress-username--username--createdBy">Created By</p>
                    <p>s0563099</p>
                </div>
            </div>

            {/* if # of comments > 0 show this */}
            <CommentsList>
                <Comment />
                <Comment /> 
                <Comment />
                <Comment />

            </CommentsList>
        </div>
    )
}

const mapStateToProps = state => {
    return { spots: state.spots };
};

export default connect(mapStateToProps)(SpotItemModal)
