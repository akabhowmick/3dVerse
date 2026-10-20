import { ReactNode } from "react";

// Dark title band shared by every non-home page: kicker, the page's one
// <h1>, an optional lead line, and the kit-stripe trim along the bottom.
export const PageHero = ({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <header className="page-hero on-dark">
      <div className="page-hero-inner">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1>{title}</h1>
        {lead && <p className="section-lead">{lead}</p>}
        {children}
      </div>
      <span className="kit-stripe" aria-hidden="true" />
    </header>
  );
};
