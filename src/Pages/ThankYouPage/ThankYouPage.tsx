import "./ThankYouPage.css";
export const ThankYouPage = () => {
  return (
    <div className="content">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>Thank you !</h1>
          <p>Thank you for ordering with us </p>
          <p>
            You will soon hear back from us regarding your order, the timeline, and if we need
            anything from you.
          </p>
          <a href="/">
            <button className="go-home">Go Home</button>
          </a>
        </div>
        <div className="footer-like">
          <p>
            <a href="/contact-us">Have any questions?</a>
          </p>
        </div>
      </div>
    </div>
  );
};
