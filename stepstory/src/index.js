import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from './components/Login/login.jsx'; // Login 컴포넌트를 import 해야 합니다.
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Socialsign from "./components/SocialSign/Socialsign.jsx";
// import Sign from "./components/Sign/Sign.jsx";
import Main from "./pages/Main/Main";
import FriendStory from "./components/FriendStory/FriendStory.jsx";
import MyStory from './components/MyStory/MyStory.jsx';
import ViewPost from './pages/ViewPost/ViewPost.jsx';
import PostStep1 from "./pages/PostStep1/PostStep1.jsx";
import PostStep2 from "./pages/PostStep2/PostStep2.jsx"
import PostStep3 from "./pages/PostStep3/PostStep3.jsx"
<<<<<<< HEAD
import MainSeoul from './components/Main/MainSeoul/MainSeoul.jsx';
=======
import Seoul from './components/MainMap/Seoul/Seoul.jsx';
>>>>>>> 265beb4 (fix: page 단위 구분)

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
        {/* <Seoul /> */}
        <FriendStory/>
        {/* {<ViewPost/>} */}
        {/* {<PostStep2/>} */}
        {/* {<PostStep3/>} */}
        {/* <Main /> */}
        {/* <FriendStory/> */}
        {/* <MyStory /> */}
        {/*<MainSeoul />*/}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
