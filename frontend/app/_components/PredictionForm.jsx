"use client";

import { useMemo, useState } from "react";

const fields = [
  {
    key: "age",
    label: "Age",
    min: 15,
    max: 22,
    type: "number",
    hint: "Student age (15-22)",
    guide:
      "Use the student's current age. Older students may show different performance patterns.",
  },
  {
    key: "studytime",
    label: "Weekly Study Time",
    min: 1,
    max: 4,
    type: "range",
    hint: "1 = <2h, 2 = 2-5h, 3 = 5-10h, 4 = >10h",
    guide:
      "This captures weekly study effort. Higher values generally indicate stronger preparation.",
  },
  {
    key: "failures",
    label: "Past Class Failures",
    min: 0,
    max: 3,
    type: "number",
    hint: "Number of previously failed subjects (0-3)",
    guide:
      "Enter previous academic setbacks. More failures can signal higher future risk.",
  },
  {
    key: "absences",
    label: "School Absences",
    min: 0,
    max: 93,
    type: "number",
    hint: "Total school absences this year",
    guide:
      "Use the total absences for this school year. Attendance strongly affects outcomes.",
  },
  {
    key: "freetime",
    label: "Free Time After School",
    min: 1,
    max: 5,
    type: "range",
    hint: "1 = very low, 5 = very high",
    guide:
      "Self-reported free time after school. Extreme values can influence study balance.",
  },
  {
    key: "goout",
    label: "Going Out with Friends",
    min: 1,
    max: 5,
    type: "range",
    hint: "1 = very low, 5 = very high",
    guide:
      "How often the student socialises. This may affect time available for academics.",
  },
  {
    key: "health",
    label: "Health Status",
    min: 1,
    max: 5,
    type: "range",
    hint: "1 = very bad, 5 = very good",
    guide:
      "General health status. Well-being can impact concentration and consistency.",
  },
  {
    key: "famrel",
    label: "Family Relationship Quality",
    min: 1,
    max: 5,
    type: "range",
    hint: "1 = very bad, 5 = excellent",
    guide:
      "Family relationship quality. Home support can influence learning outcomes.",
  },
  {
    key: "internet",
    label: "Internet Access at Home",
    min: 0,
    max: 1,
    type: "toggle",
    hint: "No = 0, Yes = 1",
    guide:
      "Whether the student has home internet access for learning resources.",
  },
  {
    key: "higher",
    label: "Wants Higher Education",
    min: 0,
    max: 1,
    type: "toggle",
    hint: "No = 0, Yes = 1",
    guide:
      "Whether the student aims for higher education after current studies.",
  },
  {
    key: "G1",
    label: "First Period Grade (G1)",
    min: 0,
    max: 20,
    type: "number",
    hint: "Grade out of 20",
    guide:
      "First period grade. Use the official recorded value from school reports.",
  },
  {
    key: "G2",
    label: "Second Period Grade (G2)",
    min: 0,
    max: 20,
    type: "number",
    hint: "Grade out of 20",
    guide:
      "Second period grade. This is often one of the strongest predictors.",
  },
];

const defaultValues = fields.reduce((acc, field) => {
  acc[field.key] = "";
  return acc;
}, {});

const fieldMap = fields.reduce((acc, field) => {
  acc[field.key] = field;
  return acc;
}, {});

const validateField = (key, value) => {
  const field = fieldMap[key];

  if (value === "" || value === null || value === undefined) {
    return "This field is required.";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "Please enter a valid number.";
  }

  if (numericValue < field.min || numericValue > field.max) {
    return `Must be between ${field.min} and ${field.max}.`;
  }

  return "";
};

const PredictionForm = ({ onSubmit, loading = false }) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [activeFieldKey, setActiveFieldKey] = useState("age");

  const sections = [
    {
      title: "Academic Core",
      keys: ["age", "studytime", "failures", "absences", "G1", "G2"],
    },
    {
      title: "Lifestyle Factors",
      keys: ["freetime", "goout", "health", "famrel"],
    },
    {
      title: "Access & Aspirations",
      keys: ["internet", "higher"],
    },
  ];

  const hasErrors = useMemo(
    () => Object.values(errors).some(Boolean),
    [errors],
  );

  const activeField = fieldMap[activeFieldKey] || fieldMap.age;

  const updateValue = (key, nextValue) => {
    setValues((previous) => ({
      ...previous,
      [key]: nextValue,
    }));

    if (errors[key]) {
      setErrors((previous) => ({
        ...previous,
        [key]: validateField(key, nextValue),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = fields.reduce((acc, field) => {
      acc[field.key] = validateField(field.key, values[field.key]);
      return acc;
    }, {});

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const payload = fields.reduce((acc, field) => {
      acc[field.key] = Number(values[field.key]);
      return acc;
    }, {});

    if (typeof onSubmit === "function") {
      onSubmit(payload);
    }
  };

  const renderField = (field) => {
    const errorText = errors[field.key];
    const isRange = field.type === "range";
    const isToggle = field.type === "toggle";
    const currentValue = values[field.key];

    return (
      <div key={field.key} className="space-y-0.5">
        <label
          htmlFor={field.key}
          className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.05em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span className="flex items-center gap-1.5">
            <span>{field.label}</span>
            <button
              type="button"
              aria-label={`Show guidance for ${field.label}`}
              onClick={() => setActiveFieldKey(field.key)}
              className="inline-flex h-4 w-4 items-center justify-center rounded border text-[10px] font-semibold normal-case"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                backgroundColor: "var(--background-secondary)",
              }}
            >
              i
            </button>
          </span>
          {isRange && (
            <span
              className="font-mono tabular-nums"
              style={{ color: "var(--text-secondary)" }}
            >
              {currentValue === "" ? "--" : currentValue}
            </span>
          )}
        </label>

        {!isToggle && (
          <input
            id={field.key}
            type={isRange ? "range" : "number"}
            min={field.min}
            max={field.max}
            step={1}
            value={
              isRange
                ? currentValue === ""
                  ? field.min
                  : currentValue
                : currentValue
            }
            onChange={(event) =>
              updateValue(
                field.key,
                event.target.value === "" ? "" : Number(event.target.value),
              )
            }
            onFocus={() => setActiveFieldKey(field.key)}
            onBlur={() => {
              setErrors((previous) => ({
                ...previous,
                [field.key]: validateField(field.key, values[field.key]),
              }));
            }}
            className={
              isRange
                ? "range-input h-5 w-full cursor-pointer appearance-none"
                : "field-input"
            }
            style={
              isRange
                ? undefined
                : {
                    borderColor: errorText ? "var(--error)" : "var(--border)",
                    boxShadow: errorText
                      ? "0 0 0 3px rgba(238,0,0,0.12)"
                      : "none",
                  }
            }
            required
          />
        )}

        {isToggle && (
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((option) => {
              const active = values[field.key] === option;
              const label = option === 1 ? "Yes" : "No";

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => updateValue(field.key, option)}
                  onFocus={() => setActiveFieldKey(field.key)}
                  className="h-8 rounded-md border text-xs font-medium transition-all duration-150"
                  style={{
                    backgroundColor: active
                      ? "var(--accent)"
                      : "var(--background-secondary)",
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    color: active
                      ? "var(--on-accent)"
                      : "var(--text-secondary)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {errorText && (
          <p className="text-xs" style={{ color: "var(--error)" }}>
            {errorText}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors duration-150 hover:border-[var(--border-hover)] dark:shadow-none"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="mb-2 border-b pb-1.5"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.05em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Student Input
        </p>
        <h2
          className="mt-1 text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Student Performance Features
        </h2>

        <div
          className="mt-2 rounded-md border px-2 py-1.5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background-secondary)",
          }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.05em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Field Guidance: {activeField.label}
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {activeField.hint || "Enter a valid value."} | Range:{" "}
            {activeField.min} to {activeField.max}
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {activeField.guide}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section) => (
          <fieldset
            key={section.title}
            className="rounded-md border p-2"
            style={{ borderColor: "var(--border)" }}
          >
            <legend
              className="px-1 text-[11px] font-semibold uppercase tracking-[0.05em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              {section.title}
            </legend>

            <div className="grid grid-cols-2 gap-2">
              {section.keys.map((key) => renderField(fieldMap[key]))}
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || hasErrors}
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border-0 text-sm font-medium tracking-[0.01em] hover:opacity-[0.85] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          backgroundColor: "var(--text-primary)",
          color: "var(--background)",
          transition: "opacity 150ms ease, transform 100ms ease",
        }}
      >
        {loading && (
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2"
            style={{
              borderColor: "currentColor",
              borderTopColor: "transparent",
            }}
          />
        )}
        <span>{loading ? "Predicting..." : "Predict Performance"}</span>
      </button>
    </form>
  );
};

export default PredictionForm;
