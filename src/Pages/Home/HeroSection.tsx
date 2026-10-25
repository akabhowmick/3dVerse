import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { companyTagline } from "../../utils/HelpfulText";
import { posterPath, videoPath } from "../../utils/Products";
import "./Home.css";

// Splits the tagline so its "3D printing" phrase can carry the brand red,
// the same way the logo picks out "3D" in its wordmark.
const highlight = /(3D printing)/i;

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Background motion should never run against a reduced-motion
  // preference; everyone else gets a pause control (WCAG 2.2.2).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterPath}
        aria-hidden="true"
      >
        <source src={videoPath} type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <p className="kicker">Custom 3D printing &middot; Made to order</p>
        <h1 id="hero-title" className="hero-title">
          {companyTagline
            .split(highlight)
            .map((part, index) =>
              highlight.test(part) ? (
                <span key={index} className="hero-title-accent">
                  {part}
                </span>
              ) : (
                part
              )
            )}
        </h1>
        <div className="hero-actions">
          <a className="btn-primary" href="/model-houses">
            Shop replica houses
          </a>
          <a className="btn-secondary" href="/miscellaneous">
            Keychains &amp; more
          </a>
        </div>
      </div>

      <button
        type="button"
        className="hero-video-toggle"
        onClick={toggleVideo}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} aria-hidden="true" />
      </button>
      <span className="kit-stripe hero-stripe" aria-hidden="true" />
    </section>
  );
};
