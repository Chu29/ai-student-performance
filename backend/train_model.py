"""
train_model.py
--------------
Trains a Random Forest classifier on the UCI Student Performance dataset.
Downloads the dataset automatically, preprocesses it, trains the model,
and saves model.pkl and scaler.pkl for use by app.py.

Run once before starting the Flask server:
    python train_model.py
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib
import urllib.request
import zipfile
import os

# ── Download dataset ──────────────────────────────────────────────────────────
DATASET_URL = "https://archive.ics.uci.edu/ml/machine-learning-databases/00320/student.zip"
ZIP_PATH = "student.zip"
CSV_PATH = "student-mat.csv"

if not os.path.exists(CSV_PATH):
    print("Downloading UCI Student Performance dataset...")
    urllib.request.urlretrieve(DATASET_URL, ZIP_PATH)
    with zipfile.ZipFile(ZIP_PATH, "r") as z:
        z.extractall(".")
    print("Dataset downloaded and extracted.")

# ── Load and preprocess ───────────────────────────────────────────────────────
df = pd.read_csv(CSV_PATH, sep=";")

# Binary encode yes/no columns
binary_cols = ["schoolsup", "famsup", "paid", "activities",
               "nursery", "higher", "internet", "romantic"]
for col in binary_cols:
    df[col] = (df[col] == "yes").astype(int)

# Encode sex
df["sex"] = (df["sex"] == "M").astype(int)

# Create grade class from final grade G3
# 0 = Fail (<10), 1 = Pass (10-13), 2 = Merit (14-16), 3 = Distinction (17-20)
def grade_class(g):
    if g < 10: return 0
    elif g < 14: return 1
    elif g < 17: return 2
    else: return 3

df["grade_class"] = df["G3"].apply(grade_class)

# Features used
FEATURES = [
    "age", "studytime", "failures", "absences",
    "freetime", "goout", "health",
    "famrel", "internet", "higher",
    "G1", "G2"
]

X = df[FEATURES]
y = df["grade_class"]

# ── Train/test split ──────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ── Scale features ────────────────────────────────────────────────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ── Train model ───────────────────────────────────────────────────────────────
print("Training Random Forest classifier...")
clf = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42,
    class_weight="balanced"
)
clf.fit(X_train_scaled, y_train)

# ── Evaluate ──────────────────────────────────────────────────────────────────
y_pred = clf.predict(X_test_scaled)
acc = accuracy_score(y_test, y_pred)
print(f"\nTest Accuracy: {acc * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred,
      target_names=["Fail", "Pass", "Merit", "Distinction"]))

# ── Save model and scaler ─────────────────────────────────────────────────────
joblib.dump(clf, "model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("\nmodel.pkl and scaler.pkl saved successfully.")
