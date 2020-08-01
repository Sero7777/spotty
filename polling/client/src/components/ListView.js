import React from "react"
import SpotsList from "./SpotsList"
import SpotItem from "./SpotItem"
import { connect } from 'react-redux';

const ListView = (props) => {

    const spotsList = props.spots.map(spot => {
        return (
            <li key={spot.id}>
                <SpotItem imgUrl={spot.pic} author={spot.username} caption={spot.title} description={spot.description} rating={spot.rating} spotId={spot.id}/>
            </li>
        )
    })

    return (
        <div className="list__container mg-top-s mg-bottom-s">
            <SpotsList>
                {spotsList}
            </SpotsList>
        </div>
    )
}

const mapStateToProps = state => {
    return { spots: state.spots };
};

export default connect(
    mapStateToProps,
)(ListView)