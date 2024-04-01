import React from 'react';
import './PostStyle.scss';
import wanttogo from '../../../../../assets/images/buttons/wanttogobutton.png';
import { Link } from 'react-router-dom';


export default function Post ({nickname,thumbnailUrl,profileImageUrl,wantToGoCount,title,travelReportId}) {
    
    console.log(nickname);
    return (
        <div className='Post'>
            <img src={thumbnailUrl} className='PostImg' alt='PostImg' />
            <div className='PostDescrition'>
                <div className='PostUser'>
                    <img src={profileImageUrl} className='PostUserProfileImg' alt='profileImg' />
                    <div className='usernameAndWantTogo'>
                        <div className='PostUsername'>
                            {nickname}
                        </div>
                        <div className='PostWantToGoCount'>
                            <img src={wanttogo} className='PostStepImg' alt='PostStepImg' />
                                {wantToGoCount}
                        </div>
                    </div>
                </div>
                <Link to={`/view-post/${travelReportId}`}>
                    <div className='postTitle'>
                        {title}
                    </div>
                </Link>
            </div>
        </div>
    );
};

