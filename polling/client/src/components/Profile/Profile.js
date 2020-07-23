import React from "react";
import ProfilePic from "./ProfilePic";
import ProfileDetails from "./ProfileDetails";
import ProfileSpots from "./ProfileSpots";
import SpotItem from "../SpotItem";

const Profile = () => {
    return (
        <div className="profile__container">
            <div className="profile mg-right-xl mg-left-xl">
                <div className="profile__top">
                    <div className="profile__pic">
                        <ProfilePic imgUrl="https://vignette.wikia.nocookie.net/two-and-a-half-men/images/e/ef/Ch.jpg/revision/latest/top-crop/width/360/height/450?cb=20160106232307&path-prefix=de" />
                    </div>
                    <ProfileDetails username="Username" karma={123} followers={26} following={89} description="Ich will der allerbeste sein wie keiner vor mir war. ganz allein sschnapp ich sie mir, ich kenne die gefahr.... POKEMON!!!" />
                </div>
                <ProfileSpots>
                    <SpotItem imgUrl="https://europa-center-berlin.de/wp-content/uploads/2018/11/puro-sky-lounge.jpg" author="Author" caption="Caption" description="TestDescr" rating={826} />
                    <SpotItem imgUrl="https://europa-center-berlin.de/wp-content/uploads/2018/11/puro-sky-lounge.jpg" author="Author" caption="Caption" description="TestDescr" rating={777} />
                    <SpotItem imgUrl="https://europa-center-berlin.de/wp-content/uploads/2018/11/puro-sky-lounge.jpg" author="Author" caption="Caption" description="TestDescr" rating={20} />
                    <SpotItem imgUrl="https://europa-center-berlin.de/wp-content/uploads/2018/11/puro-sky-lounge.jpg" author="Author" caption="Caption" description="TestDescr" rating={38} />
                </ProfileSpots>
            </div>
        </div>
    )
}

export default Profile;