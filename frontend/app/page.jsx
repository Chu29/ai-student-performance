"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import Header from "./_components/Header";
import PredictionForm from "./_components/PredictionForm";
import ProbabilityChart from "./_components/ProbabilityChart";
import RecommendationsList from "./_components/RecommendationsList";
import ResultCard from "./_components/ResultCard";
import Skeleton from "./_components/Skeleton";

const API_BASE_URL = "http://localhost:5000";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [health, setHealth] = useState("checking");

  useEffect(() => {
    let active = true;

    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
          throw new Error("Health endpoint unavailable");
        }

        const payload = await response.json();
        if (active) {
          setHealth(payload.status === "ok" ? "online" : "offline");
        }
      } catch {
        if (active) {
          setHealth("offline");
        }
      }
    };

    checkHealth();

    return () => {
      active = false;
    };
  }, []);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const payload = await response.json();
      setResult(payload);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "Unable to connect to the prediction server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />
      <main className="mx-auto grid h-[calc(100dvh-4rem)] w-full max-w-300 flex-1 min-h-0 grid-cols-1 gap-4 overflow-hidden px-4 py-3 lg:grid-cols-[minmax(420px,1fr)_1fr] lg:px-6">
        <section className="flex min-h-0 flex-col gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  health === "online"
                    ? "var(--success)"
                    : health === "checking"
                      ? "var(--warning)"
                      : "var(--error)",
              }}
            />
            <span style={{ color: "var(--text-secondary)" }}>
              Backend:{" "}
              {health === "online"
                ? "Connected"
                : health === "checking"
                  ? "Checking"
                  : "Offline"}
            </span>
          </div>

          <PredictionForm onSubmit={handlePredict} loading={loading} />
        </section>

        <section className="flex min-h-0 flex-col gap-3 overflow-auto pr-1">
          {error && (
            <div
              className="rounded-lg border p-4 text-sm"
              style={{
                backgroundColor: "var(--background-secondary)",
                borderColor: "var(--error)",
                color: "var(--error)",
              }}
            >
              {error}
            </div>
          )}

          {!result && !loading && !error && (
            <div className="flex min-h-90 flex-1 flex-col items-center justify-center gap-3 text-center">
              <GraduationCap
                size={40}
                style={{ color: "var(--text-tertiary)" }}
              />
              <p
                className="text-[13px]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Fill in the student details and click Predict Performance to see
                results.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col gap-4">
              <div
                className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none sm:px-5"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <Skeleton className="h-3 w-32" />
                <Skeleton className="mt-3 h-7 w-52" />
                <Skeleton className="mt-3 h-6 w-36 rounded-full" />
                <Skeleton className="mt-3 h-12 w-full" />
              </div>

              <div
                className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none sm:px-5"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <Skeleton className="h-3 w-48" />
                <Skeleton className="mt-4 h-50 w-full" />
              </div>

              <div
                className="rounded-lg border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none sm:px-5"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <Skeleton className="h-3 w-56" />
                <Skeleton className="mt-3 h-10 w-full" />
                <Skeleton className="mt-2 h-10 w-full" />
                <Skeleton className="mt-2 h-10 w-full" />
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="fade-in flex flex-col gap-4">
              <ResultCard result={result} />
              <ProbabilityChart probabilities={result.probabilities} />
              <RecommendationsList recommendations={result.recommendations} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
