import React from 'react';
import './Main.css';
import Footer from '../../components/Footer/footer';
import LeftPane from '../../components/LeftPane/LeftPane';
import RightPane from '../../components/RightPane/RightPane';

const Main = () => {

    const loggedInInfo = {isLoggedIn: false};
    const pageInfo = {page: 'main'};

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
