import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Sign from "./components/Sign/sign"
import Main from "./pages/Main/Main";
import MainSeoul from "./pages/Main/MainSeoul/MainSeoul";
import PostStep1 from "./pages/PostStep1/PostStep1";
import PostStep2 from "./pages/PostStep2/PostStep2";
import PostStep3 from "./pages/PostStep3/PostStep3";
import ViewPost from "./pages/ViewPost/ViewPost";



export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/seoul" element={<MainSeoul />} />
        <Route path="/view-post/:travelReportId" element={<ViewPost />} />
        <Route path="/post-step1" element={<PostStep1 />} />
        <Route path="/post-step2/:travelReportId" element={<PostStep2 />} />
        <Route path="/post-step3/:travelReportId" element={<PostStep3 />} />
      </Routes>
    </BrowserRouter>
  );
}