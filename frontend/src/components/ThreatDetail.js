import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchThreatById } from '../api/threats';

const ThreatDetail = () => {
  const { id } = useParams();
  const [threat, setThreat] = useState(null);

  useEffect(() => {
    fetchThreatById(id).then(res => setThreat(res.data));
  }, [id]);

  if (!threat) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h2>Threat Details</h2>
      <p><strong>ID:</strong> {threat._id}</p>
      <p><strong>Category:</strong> {threat.Threat_Category}</p>
      <p><strong>Severity:</strong> {threat.Severity_Score}</p>
      <p><strong>Description:</strong> {threat.Cleaned_Threat_Description}</p>
    </div>
  );
};

export default ThreatDetail;
