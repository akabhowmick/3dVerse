import "./ReviewCarousels.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { reviewTexts } from "../../../utils/HelpfulText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// A native scroll-snap track: three reviews per view on desktop, one on
// phones. Every card is a real, fully legible element (no faded "peek"
// duplicates), and the track itself is keyboard-scrollable; the arrow
// buttons just page it.
export const ReviewCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="reviews on-dark" aria-labelledby="reviews-title">
      <div className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Reviews</p>
            <h2 id="reviews-title" className="section-title">
              What customers say
            </h2>
          </div>
          <div className="review-controls">
            <button
              type="button"
              className="review-btn"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
            >
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="review-btn"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="Next reviews"
            >
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="review-track"
          ref={trackRef}
          onScroll={updateEdges}
          role="region"
          aria-label="Customer reviews"
          // Scrollable regions must be keyboard-reachable so arrow keys can
          // scroll them (axe: scrollable-region-focusable).
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <ul className="review-list">
            {reviewTexts.map((review) => (
              <li key={review.id} className="review-card">
                <span className="review-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="review-text">
                  <p>{review.review}</p>
                </blockquote>
                <div className="review-author">
                  <span className="review-avatar" aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <div>
                    <p className="review-name">{review.name}</p>
                    <p className="review-date">{review.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
