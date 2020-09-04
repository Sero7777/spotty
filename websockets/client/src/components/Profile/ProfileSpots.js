import React from "react";
import SpotsList from "../SpotsList";

const ProfileSpots = (props) => {
    return (
        <div className="profile__spots">
            <div className="profile__spots__buttons pd-top-s pd-bottom-s">
                <button>Created Spots</button>
                <div className="profile__spots__buttons__border"></div>
                <button>Liked Spots</button>
            </div>
            < SpotsList props={props}/>
        </div>
    )
}

export default ProfileSpots;