import "./ThankYouPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const ThankYouPage = () => {
  return (
    <div className="section status-page">
      <div className="status-card">
        <span className="status-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <p className="kicker">All set</p>
        <h1 className="section-title">Thank you!</h1>
        <p className="status-copy">Thank you for ordering with us.</p>
        <p className="status-copy">
          You will soon hear back from us regarding your order, the timeline, and if we need
          anything from you.
        </p>
        <div className="status-actions">
          <a className="btn-primary" href="/">
            Back to home
          </a>
          <a className="btn-secondary" href="/contact-us">
            Have any questions?
          </a>
        </div>
      </div>
    </div>
  );
};
