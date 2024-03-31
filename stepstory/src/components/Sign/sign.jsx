import React, { useState } from 'react';
import { useRef } from 'react';
import customAxios from './../../apis/axios'
import axios from 'axios';
import './sign.css';
import uploadImg from '../../image/uploadImg.png'; // 이미지 파일 임포트
import LeftPane from '../LeftPane/LeftPane';

const RightPane = () => {
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [userIdDuplicate, setUserIdDuplicate] = useState(false);
    const [nicknameDuplicate, setNicknameDuplicate] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    const [userIdChecked, setUserIdChecked] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);

    const userIdRef = useRef();
    const nicknameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const introductionRef = useRef();
    const profileImageRef = useRef();

    const checkDuplicate = async (value, type) => {
        let url = `${process.env.REACT_APP_SERVER_PORT}/api/v1/auth/`;
        let urls = type === 'userId' ? 'id-duplicate' : 'nickname-duplicate';
        try {
            const response = await customAxios.post(url, {
                [type === 'userId' ? 'serial_id' : 'nickname']: value
            });
            if (type === 'userId') {
                setUserIdDuplicate(response.data.data);
                setUserIdChecked(true);
            } else {
                setNicknameDuplicate(response.data.data);
                setNicknameChecked(true);
            }
        } catch (error) {
            console.error("Error during duplicate check:", error);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            setProfileImage(file);
        } else {
            setProfileImage(null);
        }
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!userIdChecked || userIdDuplicate) {
            alert("아이디 중복 검사를 해주세요.");
            return;
        }
        if (!nicknameChecked || nicknameDuplicate) {
            alert("닉네임 중복 검사를 해주세요.");
            return;
        }
        try {
            // 회원가입 요청
            const signupResponse = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/api/v1/auth/sign-up`, {
                serial_id: userId,
                password: password
            });

            // 로그인 요청
            const loginResponse = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/api/v1/auth/login`, {
                serial_id: userId,
                password: password
            });
            const { access_token } = loginResponse.data;

            // 프로필 업데이트 요청
            const formData = new FormData();
            formData.append('file', profileImage);
            formData.append('message', JSON.stringify({ nickname, self_info: introduction }));

            await axios.patch(`${process.env.REACT_APP_SERVER_PORT}/api/v1/users/user`, formData, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsSignupComplete(true);
            alert("회원가입이 완료되었습니다.");
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    };

    return (
        <div className="right-pane">
            <div className="add-info-box">
                <h1 className="centerAlign">추가 사용자 정보를 입력해주세요✏️</h1>
                <input
                    type="file"
                    id="upload-button"
                    style={{display: 'none'}}
                    accept='image/*'
                    onChange={handleImageUpload}
                />
                <label htmlFor="upload-button" className="uploadImg">
                    {profileImage ? (
                        <div className="preview-image-area">
                            <img src={URL.createObjectURL(profileImage)} alt="Preview"/>
                        </div>
                    ) : (
                        <div>
                            <img src={uploadImg} alt="Upload"/>
                            <br/>
                            Click to upload image
                        </div>
                    )}
                </label>
                <div>
                    <div className="id-input-group">
                        <input ref={userIdRef} type="text" placeholder="아이디를 입력하세요" className="id-input" onChange={(e) => setUserId(e.target.value)} />
                        <button onClick={() => checkDuplicate(userId, 'userId')} className='btn-duplicate-check'>중복확인</button>
                    </div>
                    <input ref={passwordRef} type="password" placeholder="비밀번호를 입력하세요" className="pw-input" onChange={(e) => setPassword(e.target.value)} />
                    <input ref={confirmPasswordRef} type="password" placeholder="비밀번호를 한번 더 입력하세요" className="pw-input" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <br/>
                </div>
                <input ref={nicknameRef} type="text" placeholder="닉네임 입력" className="nickname-input" onChange={(e) => setNickname(e.target.value)} />
                <button onClick={() => checkDuplicate(nickname, 'nickname')} className='btn2'>중복확인</button>
                {nicknameChecked && (nicknameDuplicate ? <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</div> : <div style={{ color: 'green' }}>사용 가능한 닉네임입니다.</div>)}
                <br/>
                <textarea ref={introductionRef} placeholder="소개글을 입력하세요" className="introduction-input" onChange={(e) => setIntroduction(e.target.value)}></textarea>
                <br/>
                <button onClick={handleSignup} disabled={!isSignupComplete} className='bt3'>완료</button>

            </div>
        </div>
    );
};

const Sign = () => {
    //로그인 정보
    const loggedInInfo = {isLoggedIn: false};


    return (
        <div className="sign">
            <LeftPane loggedInInfo={loggedInInfo} />
            <RightPane />
        </div>
    );
};

export default Sign;
