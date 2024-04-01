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
                        for(const i = 0; i<response.data.data.myTravelReportList.length; i++ ){
                            postCollection.push(response.data.data.myTravelReportList[i]);
                        }
                        console.log(postCollection[0]);
                    }
                }catch(error){
                    console.error("data load error: ", error);
                }
            }
        })

    return (
        <div className='PostBanner'>
            <Post 
                props = {postCollection[0]}
            />
            <Post 
                props = {postCollection[1]}
            />
            <Post 
                props = {postCollection[2]}
            />
        </div>
    );
};
