import Slider from "react-slick";
import SH_1 from "../../src/images/SH_1.png";
import SH_2 from "../../src/images/SH_2.png";
import SH_3 from "../../src/images/IMG_0678.JPG";

export default function Gallery(){
    return (
        <div className="gallery">
            <img className="gallery_img" src={SH_3} />
            <img className="gallery_img" src={SH_1} /> 
            <img className="gallery_img" src={SH_2} />
        </div>
    )
}