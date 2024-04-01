import optionButton from '../../../assets/images/buttons/nextpagebutton.png'
import './style.css';
import { useNavigate } from "react-router-dom";

export default function NextPageButton() {
    const navigate = useNavigate();

    const handlestep3 = () => {
        navigate('/post-step3');
    };

    return (
        <button className="next-page-button" onClick={handlestep3}>
            <img src={optionButton} alt="다음으로 가기 버튼" width={'40px'} />
        </button>
    );
}
