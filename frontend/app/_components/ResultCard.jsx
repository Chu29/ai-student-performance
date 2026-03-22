const gradeStyles = {
  0: {
    color: "var(--grade-fail)",
    label: "Fail",
  },
  1: {
    color: "var(--grade-pass)",
    label: "Pass",
  },
  2: {
    color: "var(--grade-merit)",
    label: "Merit",
  },
  3: {
    color: "var(--grade-distinction)",
    label: "Distinction",
  },
};

const ResultCard = ({ result }) => {
  const style = gradeStyles[result.predicted_grade_class] || gradeStyles[1];

  return (
    <article
      className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors duration-150 hover:border-(--border-hover) dark:shadow-none sm:px-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        borderLeftWidth: "4px",
        borderLeftColor: style.color,
      }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.05em]"
        style={{ color: "var(--text-tertiary)" }}
      >
        Predicted Outcome
      </p>

      <p
        className="mt-2 text-[20px] font-bold leading-tight"
        style={{ color: style.color }}
      >
        {result.predicted_grade_label || style.label}
      </p>

      <div
        className="mt-3 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.05em]"
        style={{
          backgroundColor: "var(--background-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        Confidence:{" "}
        <span className="ml-1 font-mono tabular-nums">
          {Number(result.confidence || 0).toFixed(2)}%
        </span>
      </div>

      <p
        className="mt-3 text-[13px] leading-[1.6]"
        style={{ color: "var(--text-secondary)" }}
      >
        Based on the submitted student profile, this learner is most likely to
        fall in the{" "}
        <strong>{result.predicted_grade_label || style.label}</strong> category.
      </p>
    </article>
  );
};

export default ResultCard;
