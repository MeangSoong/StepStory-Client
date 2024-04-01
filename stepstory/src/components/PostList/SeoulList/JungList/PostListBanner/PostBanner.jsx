import React, { useEffect, useState } from 'react';
import './PostBannerStyle.scss'
import axios from '../../../../../apis/axios';
import Post from '../PostList/Post';




export default function PostBanner () {
        const [postCollection, setPostCollection] = useState([]);
        //게시글 목록 담아두는 배열

    

        useEffect(() => {
            const uploadData = async () =>{
                try{
                    const response = await axios.get(
                        `/no-auth/travel-report-list/1?city=Seoul&district=Jung`
                    )
                    
                    //게시글 배열에 객체로 주입
                    if(response.data.data.data.travelReportList !==null){
                        console.log("데이터 도착");
                        setPostCollection(response.data.data.data.travelReportList.slice(0,3));
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
            {postCollection.map((post,index) => (
                <Post key = {index} {...post}/>
            ))}
        </div>
    );
};
