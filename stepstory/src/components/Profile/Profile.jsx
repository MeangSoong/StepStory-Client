import React from 'react';
import './profileStyle.css'
import defaultProfileImg from '../../assets/images/defaultprofile.png';

export default function Profile ({profile_image_url, self_intro, nickname})  {

    //props로 데이터 전달받아서 나머지 정보 뿌려주는 로직(프로필 이미지, 닉네임, 한줄 소개)

    return (
        <div className='userProfile'>
            <div className='userProfileRealArea'>
                <div className='userProfileImgAndName'>
                    <div className='userProfileImg'>
                        <img src={profile_image_url} alt='userProfileImg' />
                    </div>
                    <div className='userProfileName'>
                        <p>NAME</p>
                        <div className='userName'>
                            {nickname}
                        </div>
                    </div>
                </div>
                <div className='userProfileIntro'>
                    <div id='INTRODUCE'><p>INTRODUCE</p></div>
                    <text className='userIntro'>
                        {self_intro}
                    </text>
                </div>
            </div>
        </div>
    );
};

