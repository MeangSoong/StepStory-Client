import React from 'react';
import './PostStyle.scss';
// import bestPostImg from '../../../assets/images/bestpostdummyimg.avif';
import wanttogo from '../../../../../assets/images/buttons/wanttogobutton.png';


export default function Post ({nickname,thumbnailUrl,profileImageUrl,wantToGoCount,title}) {
    
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
                <div className='postTitle'>
                    {title}
                </div>

            </div>
        </div>
    );
};

