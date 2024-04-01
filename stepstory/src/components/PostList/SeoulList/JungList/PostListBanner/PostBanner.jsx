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
                        for(let i = 0; i<3; i++ ){
                            postCollection.push(response.data.data.data.travelReportList[i]);
                        }
                        console.log(postCollection[0].nickname);
                    }
                }catch(error){
                    console.error("data load error: ", error);
                }
            }
            uploadData();
        },[]);

    return (
        <div className='PostBanner'>
            <Post props = {postCollection[0]} />
            <Post props = {postCollection[1]} />
            <Post props = {postCollection[2]} />
        </div>
    );
};
