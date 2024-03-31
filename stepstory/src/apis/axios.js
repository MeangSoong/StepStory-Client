import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_PORT}/api/v1/`,

  withCredentials: true,
  headers: {
    "Content-Type": "application/json" //기본적인 타임, 하지만 로그인과 회원가입 form-data 형식으로 저장하고 보낸다.
  }
});

export default instance;
