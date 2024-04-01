import React, { useEffect, useState } from 'react';
import Footer from '../../../components/Footer/footer';
import LeftPane from '../../../components/LeftPane/LeftPane';
import RightPane from '../../../components/RightPane/RightPane';
import { useCookies } from 'react-cookie';
import axios from '../../../apis/axios';

// 전체 화면 컴포넌트
export default function MainSeoul  () {

        const [profile_image_url, setProfile_image_url] =useState(null);
    const [self_intro, setSelf_intro] = useState(null);
    const [userId, setUserId] = useState(null);
    const [nickname, setNickname] = useState(null);

    const [loggedInInfo, setLoggedInfo] = useState(false);
    const pageInfo = {page: 'mainSeoul'};
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
                        //respose에 application/json 형식으로 정보가 날라온다. 모든 정보를 받아야 하기 떄문에 await 처리
                        const response = await axios.get(`users/user`, {
                            headers
                        });
            
                        if(response.data ===null){
                            console.log('login fail');
                        }
                        else{
                            console.log('로컬스토리지에 저장 시도');
                            //로그인 된 leftPane 으로 변경
                            setLoggedInfo(true);

                            setProfile_image_url(response.data.data.profile_image_url);
                            setSelf_intro(response.data.data.self_info);
                            setUserId(response.data.data.userId);
                            setNickname(response.data.data.nickname);
            
                            //local storage에서 저장, 비밀번호를 제외한 모든걸 저장하는게 좋다.(애초에 안 옴 ㅠ)
                            localStorage.setItem("profile_image_url", response.data.data.profile_image_url);
                            localStorage.setItem("self_intro", response.data.data.self_info);
                            localStorage.setItem("userId", response.data.data.userId.toString());
                            localStorage.setItem("nickname", response.data.data.nickname);
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
    //페이지 정보
    
    return (
        <div className="main">
            <div className="main-content">
                <LeftPane loggedInInfo={loggedInInfo} profile_image_url={profile_image_url} self_intro={self_intro} nickname={nickname}/>
                <RightPane pageInfo={pageInfo} />
            </div>
            <Footer />
        </div>
    );
};


