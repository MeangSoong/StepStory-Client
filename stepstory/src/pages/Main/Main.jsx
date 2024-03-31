import React, { useEffect, useState } from 'react';
import './Main.css';
import Footer from '../../components/Footer/footer';
import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';
import {Cookies} from 'react-cookie';
import { useCookies } from 'react-cookie';
import axios from '../../apis/axios';


const Main = () => {
    //leftpane에 필요한정보
    const [profile_image_url, setProfile_image_url] =useState(null);
    const [self_intro, setSelf_intro] = useState(null);
    const [userId, setUserId] = useState(null);
    const [nickname, setNickname] = useState(null);


    const [loggedInInfo, setLoggedInfo] = useState(false);
    const pageInfo = {page: 'main'};
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    // local storage 한번 확인하고-> 엑세스 토큰(쿠키 안에 있음) -> 이래도 없음면 false처리, 있으면, back에다가 유저정보 확인 정보 확인 가져와 true 전환
    
    
    useEffect(() =>{
        const fetchData = async () =>{
            //localstorage 확인 logic
            if(localStorage.getItem('userId') !==null ){
                setProfile_image_url(localStorage.getItem("profile_image_url"));
                setSelf_intro(localStorage.getItem("self_intro"));
                setUserId(localStorage.getItem("userId"));
                setNickname(localStorage.getItem("nickname"));
        
                setLoggedInfo(true);
            }else{
                //쿠키 확인
                const accessToken = cookies.access_token;
                console.log(accessToken);

                if(accessToken !== null){
                    console.log('access token 있음')
                    const headers = {
                        Authorization: `Bearer ${accessToken}`
                    };
                    
                    try{
                        console.log('유저 정보 조회 요청 보냄');
                        //respose에 application/json 형식으로 정보가 날라온다. 모든 정보를 받아야 하기 떄문에 await 처리
                        const response = await axios.get(`users/user`, {
                            headers
                        });
                        console.log('유저 정보 조회 요청 받음');
                        console.log(response.data);
                        console.log(response.data.profile_image_url);
                        console.log(response.data.self_info);
                        console.log(response.data.userId);
                        console.log(response.data.nickname);
            
                        if(response.data ===null){
                            console.log('login fail');
                        }
                        else{
                            //로그인 된 leftPane 으로 변경
                            setLoggedInfo(true);
            
                            setProfile_image_url(response.data.profile_image_url);
                            setSelf_intro(response.data.self_info);
                            setUserId(response.data.userId);
                            setNickname(response.data.nickname);
            
                            //local storage에서 저장, 비밀번호를 제외한 모든걸 저장하는게 좋다.(애초에 안 온데 ㅠ)
                            localStorage.setItem("profile_image_url",profile_image_url);
                            localStorage.setItem("self_intro",self_intro);
                            localStorage.setItem("userId",userId);
                            localStorage.setItem("nickname",nickname);
                        }
                    }catch(error){
                        console.error("Nor info:", error);
                    }
                }else{
                    setLoggedInfo(false);
                }
            }
        }
        fetchData();
    },[cookies]);

    // //localstorage 확인 logic
    // if(localStorage.getItem('userId') !==null ){
    //     const profile_image_url = localStorage.getItem("profile_image_url");
    //     const self_intro =  localStorage.getItem("self_intro");
    //     const userId = localStorage.getItem("userId");
    //     const nickname = localStorage.getItem("nickname");

    //     setLoggedInfo(true);
    // }
    // //local storage에 없는경우 아래 실행
    // else
    // {//쿠키있는지 확인
    //     const cookies = new Cookies();    
    //     const accessToken = cookies?.get("access_token");
    //     if(accessToken !== null){
    //         const headers = {
    //             Authorization: `Bearer ${accessToken}`
    //         };

    //         //respose에 application/json 형식으로 정보가 날라온다.
    //         const response = axios.get(`users/user`, {
    //             headers
    //         });

    //         if(response ==null){
    //             console.log('login fail');
    //         }
    //         else{
    //             //로그인 된 leftPane 으로 변경
    //             setLoggedInfo(true);

    //             const profile_image_url = response.data.profile_image_url;
    //             const self_info = response.data.self_info;
    //             const userId = response.data.userId;
    //             const nickname = response.data.nickname;

    //             //local storage에서 저장, 비밀번호를 제외한 모든걸 저장하는게 좋다.(애초에 안 온데 ㅠ)
    //             localStorage.setItem("profile_image_url",profile_image_url);
    //             localStorage.setItem("self_intro",self_info);
    //             localStorage.setItem("userId",userId);
    //             localStorage.setItem("nickname",nickname);
    //         }
    //     }
    //     // access token이 없는경우 페이지 로그인 상테 설정
    //     else{
    //         setLoggedInfo(false);
    //     }
    // }
    
    


    console.log(loggedInInfo);

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
