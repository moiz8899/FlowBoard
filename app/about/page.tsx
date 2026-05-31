export const metadata = {
  title: "About",
  description: "About FlowBoard and its dashboard template catalog."
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About FlowBoard</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
        Dashboard templates built for people shipping client work.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
        <p>
          FlowBoard is a focused catalog of premium HTML, CSS, and JavaScript dashboard templates for freelancers,
          indie developers, solo founders, students, and small agencies.
        </p>
        <p>
          Every template is designed to be opened locally, customized quickly, and used as a serious starting point
          for real dashboards instead of throwaway demos.
        </p>
        <p>
          For support, product questions, or payment help, contact FlowBoard at dialyn360@gmail.com.
        </p>
      </div>
    </section>
  );
}
