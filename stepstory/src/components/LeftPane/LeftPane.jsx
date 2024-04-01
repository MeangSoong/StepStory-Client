import React, { useState } from 'react';
import {Link, useHref, useNavigate} from 'react-router-dom';
import './leftPane.css';
import logo from '../../image/Blogo.svg';
import open from "../../image/OpenD.png";
import close from "../../image/CloseD.png";
import Profile from '../Profile/Profile';
import axios from 'axios';
import { Cookies } from 'react-cookie';

// 상단 로그인에 따른 상태변화
function UpState({ loggedInInfo, profile_image_url, self_intro, nickname }) {
    return loggedInInfo ? <Login1 profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname} /> : <Logout />;
}

// 하단 로그인에 따른 상태변화
function DownState({ loggedInInfo, setLocationsGps }) {
    return loggedInInfo ? <Login2 setLocationsGps={setLocationsGps} /> : null; // 로그인 상태가 아니면 아무 것도 렌더링하지 않음
}

// 로그인이 안 돼있을 시 로그인,회원가입 버튼 표기
const Logout = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 로그인 페이지로 이동하는 함수
    const handleLoginClick = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleSignupClick = () => {
        navigate('/signup'); // 회원가입 페이지로 이동
    };

    return (
        <div className="buttons">
            <button className="btn" onClick={handleLoginClick}>LOGIN</button>
            <button className="btn" onClick={handleSignupClick}>SIGN</button>
        </div>
    );
}


// 로그인 시 프로필 표기
const Login1 = ({profile_image_url, self_intro, nickname}) => (
    <Profile profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname} />
);

const uploadImageAndAddToLocationGps = async (imageData) => {
    try {
        // 이미지를 업로드하고 API를 호출하여 GPS 정보를 받아옴
        const response = await axios.post('/api/v1/users/travel-report/meta', {
            image: imageData // 이미지 데이터를 요청에 포함
        });

        // API 응답에서 GPS 정보를 추출
        const gpsInfo = response.data.gps;

        return gpsInfo; // GPS 정보 반환
    } catch (error) {
        console.error('이미지 업로드 및 API 호출 중 오류 발생:', error);
        throw error; // 오류 발생 시 상위 컴포넌트로 전파
    }
};

// 로그인 시 하단에 로그아웃, 마이스토리, 글쓰기 버튼 표기
const Login2 = ({ setLocationsGps }) => {
    const [isHovered, setIsHovered] = useState(false); // 버튼의 호버 상태를 추적하기 위한 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용
    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };
    const handleLogoutClick = async() => {
        console.log('logout');
    }

    const handleWriteStoryClick = () => {
        setIsModalOpen(true);
        navigate('/post-step1');
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="logout-container">
            <button className="story-btn"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleWriteStoryClick}
            >
                <img src={isHovered ? open : close} alt="MyStory" className="story-icon"
                     onClick={handleWriteStoryClick} />
            </button>
            <button className="btn" onClick={handleWriteStoryClick}>Write Story&nbsp;&nbsp;✏️</button>
            <button className="logout-btn" onClick={handleLogoutClick}>LOGOUT</button>
            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p>Post your story here</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const LeftPane = ({ loggedInInfo, profile_image_url, self_intro, nickname }) => {
    const [locationsGps, setLocationsGps] = useState([]); // 위치 정보 상태 및 setter 함수 선언

    return (
        <div className="left-pane">
            <div className="left-content">
                <Link to={'/'}><img src={logo} alt="Logo" className="logo"/></Link>
                <UpState loggedInInfo={loggedInInfo} profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname}   />
            </div>
            <div className="logout-container">
                <DownState loggedInInfo={loggedInInfo} setLocationsGps={setLocationsGps} />
            </div>
        </div>
    );
};

export default LeftPane;
