"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barPalette = [
  "var(--grade-fail)",
  "var(--grade-pass)",
  "var(--grade-merit)",
  "var(--grade-distinction)",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div
      className="rounded-md border px-3 py-2 text-xs"
      style={{
        backgroundColor: "var(--surface-raised)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
    >
      <p>{item.fullLabel}</p>
      <p className="mt-1 font-mono tabular-nums">
        {Number(item.value).toFixed(2)}%
      </p>
    </div>
  );
};

const ProbabilityChart = ({ probabilities }) => {
  const data = Object.entries(probabilities || {}).map(([label, value]) => ({
    label: label.split(" ")[0],
    fullLabel: label,
    value: Number(value) || 0,
  }));

  return (
    <article
      className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors duration-150 hover:border-(--border-hover) dark:shadow-none sm:px-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <h3
        className="mb-4 text-xs font-semibold uppercase tracking-[0.05em]"
        style={{ color: "var(--text-tertiary)" }}
      >
        Grade Probability Distribution
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -8, bottom: 2 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
            unit="%"
            domain={[0, 100]}
          />
          <Tooltip
            cursor={{ fill: "var(--background-secondary)" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((item, index) => (
              <Cell
                key={item.fullLabel}
                fill={barPalette[index % barPalette.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
};

export default ProbabilityChart;
