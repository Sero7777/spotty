import React, {useState} from "react"
import SpotsList from "./SpotsList"
import SpotItem from "./SpotItem"
import { connect } from 'react-redux';

const ListView = (props) => {
    const spotsList = props.spots.map(spot => {
        return (
            <li key={spot.id}>
                <SpotItem spot={spot} username={props.username}/>
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
    return { spots: state.spots, username: state.user.username };
};

export default connect(
    mapStateToProps,
)(ListView)