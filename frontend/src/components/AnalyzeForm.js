import React, { useState } from 'react';
import axios from 'axios';

const AnalyzeForm = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/analyze/", {
        description: description,
      }, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      setResult(res.data.predicted_category);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while analyzing.');
      setResult(null);
    }
  };

  return (
    <div className="page-container">
      <h2>Threat Category Prediction</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="Enter a threat description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '10px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Analyze</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Predicted Category:</strong> {result}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default AnalyzeForm;
