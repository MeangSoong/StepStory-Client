import React from 'react';
import './right.css'
import MainMap from '../MainMap/MainMap';
import FriendpageButton from '../Buttons/FriendpageButton/MyStoryPageButton';
import SeoulMap from '../SubMap/Seoul/SeoulMap';
import RightSideBar from '../RightSideBar/RightSideBar'

export default function RightPane ({pageInfo}) {
    
    
    if(pageInfo.page === 'myStory'){
        return (
            <div className="right-pane">
                <FriendpageButton />
                <MainMap/>
                <RightSideBar />
            </div>
    );}
    else if(pageInfo.page === 'mainSeoul'){
        return(
            <div className="right-pane">
               <SeoulMap />
               <RightSideBar />
            </div>
        )
    }
    else{
        return(        
            <div className="right-pane">
                <MainMap/>
                <RightSideBar />
            </div> )

    }
};

