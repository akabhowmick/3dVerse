import "./Legal.css";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PageHero } from "../../Components/PageHero/PageHero";
import { legalLinks, policiesLastUpdated } from "../../utils/legal";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

// Shared shell for the policy pages: title band, an "On this page" list
// (sticky beside the text on desktop), the sections, and links to the
// other policies.
export const LegalPage = ({
  title,
  lead,
  sections,
}: {
  title: string;
  lead: string;
  sections: LegalSection[];
}) => {
  const { pathname } = useLocation();
  const otherPolicies = legalLinks.filter((link) => link.value !== pathname);

  return (
    <>
      <PageHero kicker="Policies" title={title} lead={lead} />
      <div className="section legal-layout">
        <nav className="legal-toc" aria-label="On this page">
          <p className="legal-toc-title">On this page</p>
          <ol>
            {sections.map(({ id, title: sectionTitle }) => (
              <li key={id}>
                <a href={`#${id}`}>{sectionTitle}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="legal-body">
          <p className="legal-updated">Last updated {policiesLastUpdated}</p>
          {sections.map(({ id, title: sectionTitle, content }) => (
            <section key={id} id={id} className="legal-section" aria-labelledby={`${id}-title`}>
              <h2 id={`${id}-title`}>{sectionTitle}</h2>
              {content}
            </section>
          ))}

          <aside className="legal-related" aria-label="Other policies">
            <p className="legal-related-title">Other policies</p>
            <ul>
              {otherPolicies.map((link) => (
                <li key={link.value}>
                  <a className="text-link" href={link.value}>
                    {link.key} <span aria-hidden="true">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </article>
      </div>
    </>
  );
};
