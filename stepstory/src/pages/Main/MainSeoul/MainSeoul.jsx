import React from 'react';
import Footer from '../../../components/Footer/footer';
import LeftPane from '../../../components/LeftPane/LeftPane';
import RightPane from '../../../components/RightPane/RightPane';

// 전체 화면 컴포넌트
export default function MainSeoul  () {

    //페이지 정보
    const pageInfo = {page: 'mainSeoul'};
    return (
        <div className="main">
            <div className="main-content">
                <LeftPane />
                <RightPane pageInfo={pageInfo} />
            </div>
            <Footer />
        </div>
    );
};


