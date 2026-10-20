import { companyName } from "../../utils/HelpfulText";

// Text version of the logo's lettering: widely tracked caps with the "3"
// in red and the "D" in blue. Falls back to the plain name if the company
// name ever stops containing "3D".
export const Wordmark = () => {
  const splitAt = companyName.indexOf("3D");
  if (splitAt === -1) return <span className="wordmark">{companyName}</span>;
  return (
    <span className="wordmark">
      {companyName.slice(0, splitAt)}
      <span className="wordmark-3">3</span>
      <span className="wordmark-d">D</span>
      {companyName.slice(splitAt + 2)}
    </span>
  );
};
