import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Main from "./pages/Main/Main";
import PostStep1 from "./pages/PostStep1/PostStep1";
import PostStep2 from "./pages/PostStep2/PostStep2";
import PostStep3 from "./pages/PostStep3/PostStep3";


const Layout = () => {
  return (
    <>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
