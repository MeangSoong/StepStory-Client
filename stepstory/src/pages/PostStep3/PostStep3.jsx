import React from "react";
import "./style.css";
import PostStep3Main from "../../components/PostStep3Main/PostStep3Main.jsx";
import Header from "../../components/Header/Header.jsx";

export default function PostStep2() {
    const [images, setImages] = useState([]);
    const { travelReportId } = useParams();

    useEffect(() => {
        const getTravelReportImages = async () => {
            try {
                const cookie = new Cookies();
                const access_token = cookie.get('access_token');
                const response = await axios.get(`users/travel-report/travel-image/${travelReportId}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                    withCredentials: true
                });

                const fetchedImages = response.data.data.writeReportTravelImageListDto.writeReportTravelImageDtos.map(img => ({
                    src: img.travelImageUrl,
                    alt: 'Travel Image',
                }));

                setImages(fetchedImages);
            } catch (error) {
                console.error('Fetching travel report images failed:', error);
            }
        };

        getTravelReportImages();
    }, []); 

    return (
        <div className="post-step3-page-container">
            <Header locationName="새 게시물 만들기"/>
            <PostStep3Main images={images} title={null} content={null} />
        </div>
    );
}

