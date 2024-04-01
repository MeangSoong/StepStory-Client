import React, { useEffect } from 'react';
import './PostBannerStyle.scss'
import axios from '../../../../../apis/axios';
import Post from '../PostList/Post';




export default function PostBanner () {

        //게시글 목록 담아두는 배열
        let postCollection = [];
    

        useEffect(() => {
            const uploadData = async () =>{
                try{
                    const response = await axios.get(
                        `/no-auth/travel-report-list/1?city=Seoul&district=Jung`
                    )
                    
                    //게시글 배열에 객체로 주입
                    if(response.data.data.data.travelReportList !==null){
                        console.log("데이터 도착");
                        for(let i = 0; i<response.data.data.data.myTravelReportList.length; i++ ){
                            postCollection.push(response.data.data.data.myTravelReportList[i]);
                        }
                        console.log(postCollection[0]);
                    }
                }catch(error){
                    console.error("data load error: ", error);
                }
            }
            uploadData();
        },[]);

    return (
        <div className='PostBanner'>
            {postCollection.slice(0, 3).map((post, index) => (
                <Post key={index} {...post} /> // 구조 분해 할당을 사용하여 전달
            ))}
        </div>
    );
};
