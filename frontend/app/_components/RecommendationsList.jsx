const RecommendationsList = ({ recommendations }) => {
  return (
    <article
      className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors duration-150 hover:border-(--border-hover) dark:shadow-none sm:px-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <h3
        className="mb-2 text-xs font-semibold uppercase tracking-[0.05em]"
        style={{ color: "var(--text-tertiary)" }}
      >
        Personalised Recommendations
      </h3>

      <ul>
        {(recommendations || []).map((recommendation, index) => (
          <li
            key={`${index}-${String(recommendation).slice(0, 20)}`}
            className="flex gap-3 border-b py-3 last:border-b-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[11px] font-semibold"
              style={{
                backgroundColor: "var(--background-secondary)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {index + 1}
            </span>

            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {recommendation}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RecommendationsList;
