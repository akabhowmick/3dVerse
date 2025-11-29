import { companyTagline } from "../../utils/HelpfulText";
import { posterPath, videoPath } from "../../utils/Products";
import "./Home.css";

export const HeroSection = () => {
  return (
    <div className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        id="hero-video"
        playsInline
        poster={posterPath} 
      >
        <source src={videoPath} type="video/mp4" />
      </video>

      <div
        className="container"
        style={{
          backgroundImage: "url(src/assets/Main/background.jpg)", 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-md-6 order-2 hero__lead text-xl">
            <h2>{companyTagline}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
