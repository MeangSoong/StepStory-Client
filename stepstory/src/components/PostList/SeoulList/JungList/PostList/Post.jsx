import React from 'react';
import './PostStyle.scss';
// import bestPostImg from '../../../assets/images/bestpostdummyimg.avif';
import wanttogo from '../../../../../assets/images/buttons/wanttogobutton.png';


export default function Post ({props}) {

    console.log(props.nickname);
    return (
        <div className='Post'>
            <img src={props.thumbnailUrl} className='PostImg' alt='PostImg' />
            <div className='PostDescrition'>
                <div className='PostUser'>
                    <img src={props.profileImageUrl} className='PostUserProfileImg' alt='profileImg' />
                    <div className='usernameAndWantTogo'>
                        <div className='PostUsername'>
                            {props.nickname}
                        </div>
                        <div className='PostWantToGoCount'>
                            <img src={wanttogo} className='PostStepImg' alt='PostStepImg' />
                                {props.wantToGoCount}
                        </div>
                    </div>
                </div>
                <div className='postTitle'>
                    {props.title}
                </div>

            </div>
        </div>
    );
};

