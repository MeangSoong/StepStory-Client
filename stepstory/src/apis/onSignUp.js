import axios from "axios";

export const onSignUp = (userInfo, router) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_PORT}/api/v1/auth/sign-up`, userInfo)
    .then((res) => {
      console.log(res.data);
      router("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
