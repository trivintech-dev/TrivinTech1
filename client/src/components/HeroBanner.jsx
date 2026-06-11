const HeroBanner = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  spotlight,
  background,
  className = ""
}) => {
  const hasSpotlight = Boolean(spotlight);

  return (
    <section className={`relative mb-6 sm:mb-10 overflow-hidden rounded-2xl sm:rounded-[32px] border border-gray-100/15 bg-[radial-gradient(circle_at_top_right,rgba(110,231,255,0.16),transparent_32%),linear-gradient(180deg,rgba(6,12,24,0.96),rgba(4,10,20,0.92))] px-4 sm:px-6 lg:px-10 py-6 sm:py-10 lg:py-12 shadow-sm ${className}`}>
      {background ? (
        <div className="absolute inset-0 opacity-70">
          {background}
        </div>
      ) : null}
      <div className="relative z-10">
        <div
          className={
            hasSpotlight
              ? "grid gap-4 sm:gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:items-center"
              : "mx-auto flex max-w-4xl flex-col items-center space-y-4 sm:space-y-6 text-center"
          }
        >
          <div className="space-y-3 sm:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-ink lg:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
              {description}
            </p>
            <div className={hasSpotlight ? "flex flex-wrap gap-2 sm:gap-4 pt-2" : "flex flex-wrap justify-center gap-2 sm:gap-4 pt-2"}>
              {primaryAction}
              {secondaryAction}
            </div>
          </div>

          {hasSpotlight ? (
            <div className="rounded-[28px] border border-gray-100/15 bg-slate-900/70 p-6 backdrop-blur">
              {spotlight}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;