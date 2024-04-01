import React, { useState,  } from 'react';
import './loginStyle.css'; // 스타일 파일을 불러옵니다.
import {  useNavigate } from 'react-router-dom';
import kakaoLogin from '../../image/loginKakao.png';
import googleLogin from '../../image/loginGoogle.png';
import LeftPane from '../LeftPane/LeftPane';
import axios from 'axios';


// 오른쪽 화면 컴포넌트
const LoginRightPane = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false); // 로그인 에러 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    function handleSignupClick() {
        navigate('/signup'); // 회원가입 페이지로 이동
    }



    const handleLogin = async () => {
        let form = new FormData();
        form.append('serial_id', username);
        form.append('password', password);
    
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_PORT}/api/v1/auth/login`,
                form,
                { withCredentials: true }
            );
            
            alert("로그인에 성공했습니다.");
            setLoginError(false); 
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('로그인 실패:', error);
            setLoginError(true);
            alert('잘못된 아이디와 비밀번호입니다.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();  // 엔터 키가 눌리면 로그인 처리 함수 호출
        }
    };

    return (
        <div className="right-pane">
            <div className="social-login-box">
                <h1 className="centerAlign">LOGIN</h1>
                <div className="login-box">
                    <br/>
                    <div className="input-box">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className="input-field"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
                        />
                        {loginError && ( // 로그인 에러 발생 시 메시지 띄우기
                            <p className="error-message">아이디 또는 비밀번호를 다시 확인해주세요.</p>
                        )}
                    </div>
                    <br/>
                    <button className="login-btn" onClick={handleLogin}>로그인</button>
                </div>
                <a href="https://stepstory.site/oauth2/authorization/kakao" className="social-login-link">
                    <img src={kakaoLogin} alt="Kakao Login" className="social-login-btn"/>
                </a>
                <a href="https://stepstory.site/oauth2/authorization/google" className="social-login-link">
                    <img src={googleLogin} alt="Google Login" className="social-login-btn"/>
                </a>

                <h5 className="signup-text">아직 회원이 아니신가요? <button className="signup-btn" onClick={handleSignupClick}> 회원가입</button></h5>
            </div>
        </div>
    );
};


// 전체 화면 컴포넌트
const Login = () => {
    //로그인 정보
    const loggedInInfo = false;

    return (
        <div className="login">
            <LeftPane loggedInInfo={loggedInInfo} />
            <LoginRightPane />
        </div>
    );
};

export default Login;
