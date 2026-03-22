# AI-Powered Student Academic Performance Prediction System

## Project Structure
```
AI_Performance_System/
├── backend/
│   ├── app.py              # Flask REST API
│   ├── train_model.py      # ML model training script
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── app/
    │   ├── page.jsx         # Main dashboard page
    │   ├── layout.jsx       # Root layout
    │   └── globals.css     # Global styles
    ├── _components/
    │   ├── Header.jsx
    │   ├── PredictionForm.jsx
    │   ├── ResultCard.jsx
    │   ├── ProbabilityChart.jsx
    │   └── RecommendationsList.jsx
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python train_model.py     # trains and saves model.pkl + scaler.pkl
python app.py             # starts API at http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev               # starts dashboard at http://localhost:3000
```

Make sure the backend is running before using the frontend.
