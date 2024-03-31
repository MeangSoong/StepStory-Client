import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './components/Login/login.jsx'; // Login 컴포넌트를 import 해야 합니다.
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostStep1 from "./pages/PostStep1/PostStep1.jsx";
import Socialsign from "./components/SocialSign/socialsign.jsx";
import Sign from "./components/Sign/sign.jsx";
import Main from "./pages/Main/Main.jsx";
import FriendStory from "./components/FriendStory/FriendStory.jsx";
import MyStory from './components/MyStory/MyStory.jsx';
import ViewPost from './pages/ViewPost/ViewPost.jsx';
import PostStep2 from "./pages/PostStep2/PostStep2.jsx"
import PostStep3 from "./pages/PostStep3/PostStep3.jsx"
import MainSeoul from './pages/Main/MainSeoul/MainSeoul.jsx';
import { Route, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <Login /> */}
        {/* <Socialsign /> */}
        {/* <Sign /> */}
        {/*<PostStep1 />*/}
        {/*<App />*/}
        {/* {<Main />} */}
        {/* <FriendStory/> */}
        {/* <MyStory /> */}
        {/* <Main /> */}
        {/* <FriendStory/> */}
        {/* <ViewPost/> */}
        {/* {<PostStep2/>} */}
        {/* {<PostStep3/>} */}
        {/* <Main /> */}
        {/* <FriendStory/> */}
        {/* <MyStory /> */}
        {/*<MainSeoul />*/}
        <Router/>
    </React.StrictMode>
);