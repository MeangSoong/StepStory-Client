import React, { useState } from 'react';
import './Main.css';
import Footer from '../../components/Footer/footer';
import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';
import {Cookies} from 'react-cookie';
import axios from 'axios';


const Main = () => {

    const [loggedInInfo, setLoggedInfo] = useState(false);
    const pageInfo = {page: 'main'};

    // local storage 한번 확인하고-> 엑세스 토큰(쿠키 안에 있음) -> 이래도 없음면 false처리, 있으면, back에다가 유저정보 확인 정보 확인 가져와 true 전환
    
    //localstorage 확인 logic
    if(localStorage.getItem('userId') !==null ){
        const profile_image_url = localStorage.getItem("profile_image_url");
        const self_intro =  localStorage.getItem("self_intro");
        const userId = localStorage.getItem("userId");
        const nickname = localStorage.getItem("nickname");

        setLoggedInfo(true);
    }
    //local storage에 없는경우 아래 실행
    else
    {//쿠키있는지 확인
    const cookies = new Cookies();    
    const accessToken = cookies?.get("access_token");
    if(accessToken !== null){
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        //respose에 application/json 형식으로 정보가 날라온다.
        const response = axios.get(`users/user`, {
            headers
        });

        if(response ==null){
            console.log('login fail');
        }
        else{
            //로그인 된 leftPane 으로 변경
            setLoggedInfo(true);

            const profile_image_url = response.data.profile_image_url;
            const self_info = response.data.self_info;
            const userId = response.data.userId;
            const nickname = response.data.nickname;

            //local storage에서 저장, 비밀번호를 제외한 모든걸 저장하는게 좋다.(애초에 안 온데 ㅠ)
            localStorage.setItem("profile_image_url",profile_image_url);
            localStorage.setItem("self_intro",self_info);
            localStorage.setItem("userId",userId);
            localStorage.setItem("nickname",nickname);


        }
    }}
    
    




    return (
        <div className="main">
            <div className="main-content">
                <LeftPane loggedInInfo={loggedInInfo}/>
                <RightPane pageInfo={pageInfo}/>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
