import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

# Load your data (update path if needed)
df = pd.read_csv('...') # Ensure file name is changed according to your system

# Rename columns if needed
df.rename(columns={
    'Threat Category': 'Threat_Category',
    'Cleaned Threat Description': 'Cleaned_Threat_Description'
}, inplace=True)

# Drop missing entries
df.dropna(subset=['Threat_Category', 'Cleaned_Threat_Description'], inplace=True)

# Define features and target
X = df['Cleaned_Threat_Description']
y = df['Threat_Category']

# Create pipeline (TF-IDF + Logistic Regression)
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000)),
    ('clf', LogisticRegression(max_iter=1000))
])

# Train the model
pipeline.fit(X, y)

# Save the model
joblib.dump(pipeline, 'E:/Consecure_Assignment/backend/ml/model.joblib')
print("✅ Model trained and saved to ../backend/ml/model.joblib")
