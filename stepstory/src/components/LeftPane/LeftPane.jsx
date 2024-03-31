import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './leftPane.css';
import logo from '../../image/Blogo.svg';
import open from "../../image/OpenD.png";
import close from "../../image/CloseD.png";
import Profile from '../Profile/Profile';

// 상단 로그인에 따른 상태변화
function UpState({ isLoggedIn, profile_image_url, self_intro, userId, nickname }) {
  return isLoggedIn ? <Login1 profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname} /> : <Logout />;
}

// 하단 로그인에 따른 상태변화
function DownState({ isLoggedIn }) {
  return isLoggedIn ? <Login2 /> : null; // 로그인 상태가 아니면 아무 것도 렌더링하지 않음
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
const Login1 = (profile_image_url, self_intro, nickname) => (
  <Profile profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname} />
);

// 로그인 시 하단에 로그아웃, 마이스토리, 글쓰기 버튼 표기
const Login2 = () => {
  const [isHovered, setIsHovered] = useState(false); // 버튼의 호버 상태를 추적하기 위한 상태 추가

  return(
    <div className="logout-container">
      <button className="story-btn"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
      >

        <img src={isHovered ? open : close} alt="MyStory" className="story-icon" />
      </button>
      <button className="btn">Write Story&nbsp;&nbsp;✏️</button>
      <button className="logout-btn">LOGOUT</button>
      {/* 로그아웃시 기본 메인페이지 감 */}
    </div>
  );
};

const LeftPane = ({ loggedInInfo, profile_image_url, self_intro, nickname }) => {
  const isLoggedIn = loggedInInfo ? loggedInInfo.isLoggedIn : false;

  return (
    <div className="left-pane">
      <div className="left-content">
        <Link to={'/'}><img src={logo} alt="Logo" className="logo"/></Link>
        <UpState isLoggedIn={isLoggedIn} profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname}   />
      </div>
      <div className="logout-container">
        <DownState isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default LeftPane;
