import "../ThankYouPage/ThankYouPage.css";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <div className="section status-page">
      <div className="status-card">
        <p className="notfound-code" aria-hidden="true">
          404
        </p>
        <h1 className="section-title">Page not found</h1>
        <p className="status-copy">
          Sorry! The page you are looking for can not be found. It may have been moved or
          deleted, or there may be a small typo in the address.
        </p>
        <div className="status-actions">
          <a className="btn-primary" href="/">
            Back to home
          </a>
          <a className="btn-secondary" href="/model-houses">
            Shop replica houses
          </a>
        </div>
      </div>
    </div>
  );
};
