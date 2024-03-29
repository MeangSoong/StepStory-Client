import axios from "axios";

export const emailCheck = (formData, setFormData, setIsEmailAvailable) => {
  
  axios
    .post(`/user/${formData.email}`)
    .then(() => {
      alert("사용할 수 있는 이메일입니다.");
      setIsEmailAvailable(true);
    })
    .catch(() => {
      alert("사용할 수 없는 이메일입니다.");
      setFormData({ ...formData, email: "" });
      setIsEmailAvailable(false);
    });
};
