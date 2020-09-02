import React from "react";

const ProfileDetails = (props) => {  
    return (
        <div className="profile__details">
            <div className="profile__details__container">
                <div className="profile__details__top mg-bottom-s">
                    <div className="profile__details__name"><span>{props.username}</span></div>
                    <button className="profile__details__btn" id="edit-btn" onClick={() => console.log("Edit btn clicked")}>Edit Profile</button>
                </div>
                <div className="profile__details__mid mg-bottom-s">
                    <div><span className="profile__details__values">{props.karma}</span> Karma</div>
                    <div><span className="profile__details__values">{props.followers}</span> Followers</div>
                    <div><span className="profile__details__values">{props.following}</span> Following</div>
                </div>
                <div className="profile__details__description">{props.description}</div>
            </div>
        </div>
    )
}

export default ProfileDetails;