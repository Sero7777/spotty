import React from "react";

const SpotsList = ({props}) => {
    return (
        <div className="spots__list">
            {props.children}
        </div>
    )
}

export default SpotsList;