import React, { useEffect, useState } from "react";
import { Cookies } from 'react-cookie';
import axios from "./../../apis/axios"
import PostStep2Main from "../../components/PostStep2Main/PostStep2Main";
import Header from "../../components/Header/Header";
import './style.css';
import { useParams } from "react-router-dom";

const headerExample = "새 게시물 만들기";

export default function PostStep2() {
    const [images, setImages] = useState([]);
    const [locationsGps, setLocationsGps] = useState([]);

    const { travelReportId } = useParams();

    useEffect(() => {
        const getTravelReportImages = async () => {
            try {
                const cookie = new Cookies();
                const access_token = cookie.get('access_token');
                const response = await axios.get(`users/travel-report/travel-image/${travelReportId}`, {
                    headers: {
                
                        'Authorization': `Bearer ${access_token}`
                    },
                    withCredentials: true
                });

                const fetchedImages = response.data.data.writeReportTravelImageListDto.writeReportTravelImageDtos.map(img => ({
                    src: img.travelImageUrl,
                    alt: 'Travel Image',
                }));

                const fetchedLocations = response.data.data.writeReportTravelImageListDto.writeReportTravelImageDtos.map(loc => ({
                    lat: loc.detailCourse.latitude,
                    lng: loc.detailCourse.longitude,
                }));

                setImages(fetchedImages);
                setLocationsGps(fetchedLocations);
            } catch (error) {
                console.error('Fetching travel report images failed:', error);
            }
        };

        getTravelReportImages();
    }, []); 

    return (
        <div className="post-step2-page-container"> 
            <Header locationName={headerExample}/>
            <PostStep2Main images={images} locationsGps={locationsGps} />
        </div>
    );
}