const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {subtitle}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
