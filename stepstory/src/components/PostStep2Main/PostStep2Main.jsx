import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import Map from "../Map/Map";
import NextPageButton from "../Buttons/NextPageButton/NextPageButton";
import BackPageButton from "../Buttons/BackPageButton/BackPageButton";
import './style.css';

export default function PostStep2Main({ images, locationsGps}) {
  return (
    <div className="post-step-container">
      <div className="left-panel-post2">
        <div className="carousel">
          <ImageSlider className = "image-slider-post2" images={images} />
        </div>
        <BackPageButton className="back" />
      </div>
      <div className="right-panel-post2">
        <div className="steps-list-container">
          <h3 className="steps-list-title">🗺️ 위치 정보 🗺️</h3>
          <ul className="steps-list">
            <li>1. 가산디지털단지 8번출구</li>
            <li>2. 가산 디지털 단지 가는 지하철</li>
            <li>3. 카카오 클라우드 스쿨 3 강의실</li>
            <li>4. 카카오 클라우드 스쿨 3 강의실 뒷자리</li>
            <li>5. 카카오 클라우드 스쿨 3 강의실 오른쪽 자리</li>
          </ul>
        </div>
        <div className="location-map">
          <Map locationsGps={locationsGps} />
        </div>
        <NextPageButton className="next" />
      </div>
    </div>
  );
}
