type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-line pt-6">
            <h2 className="font-display text-2xl font-bold text-white">{section.title}</h2>
            <div className="mt-3 space-y-3 text-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
