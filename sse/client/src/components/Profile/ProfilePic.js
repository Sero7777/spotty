import React from "react";

const ProfilePic = (props) => {
    return (
        <img src={props.imgUrl} alt="Profile Pic" className="profile__pic__image" />
    )
}

export default ProfilePic;