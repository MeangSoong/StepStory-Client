import React, { useState , useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import axios from './../../apis/axios';
import "./style.css";

export default function PostStep3Main({ images }) {
  const [activePrivacy, setActivePrivacy] = useState('public'); // 초기 상태를 'public'으로 설정
  const navigate = useNavigate();
  const travelReportId = useParams().travelReportId;
  const titleRef = useRef(null); 
  const contentRef = useRef(null);

  const privacyMap = {
    public: "1",
    friend: "2",
    private: "3",
  };

  const handlePrivacyClick = (privacy) => {
    setActivePrivacy(privacy); // 클릭된 버튼에 따라 상태를 변경
  };

  const handleFinishButtonClick = async() => {
    const cookies = new Cookies();
    const accessToken = cookies.get('access_token');
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const readPermission = privacyMap[activePrivacy];
    
    try{
        await axios.post(`/api/v1/users/travel-report`, {
            title: title,
            body: content,
            readPermission: readPermission,
            travelReportId: travelReportId
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        navigate('/');
    } catch (error) {
        console.error('Failed to post:', error);
    }
};

return (
    <div className="post-step3-container">
        <div className="left-panel-post3">
            <div className="image-slider-post3-container">
                <ImageSlider className="image-slider-post3" images={images} />
            </div>
        </div>

        <div className="right-panel-post3">
            <div className="text-input">
                <textarea ref={titleRef} className="input-title" placeholder="제목을 입력하세요."></textarea>
                <textarea ref={contentRef} className="input-content" placeholder="게시글을 입력하세요."></textarea>
            </div>

            <div className="privacy-settings">
                <button 
                    className={`privacy-button ${activePrivacy === 'public' ? 'active' : ''}`}
                    onClick={() => handlePrivacyClick('public')}
                >
                    PUBLIC
                </button>
                <button 
                    className={`privacy-button ${activePrivacy === 'friend' ? 'active' : ''}`}
                    onClick={() => handlePrivacyClick('friend')}
                >
                    FRIEND
                </button>
                <button 
                    className={`privacy-button ${activePrivacy === 'private' ? 'active' : ''}`}
                    onClick={() => handlePrivacyClick('private')}
                >
                    PRIVATE
                </button>
                <button 
                    className="submit-button"
                    onClick={handleFinishButtonClick}
                >
                    게시하기
                </button>
            </div>
        </div>
    </div>
  );
}