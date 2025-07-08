import React, { useEffect, useState } from 'react';
import { fetchThreats } from '../api/threats';
import { Link } from 'react-router-dom';
//import './ThreatList.css';

const ThreatList = () => {
  const [threats, setThreats] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchThreats({ page, limit: 10, search, category }).then(res => {
      console.log("Threats from API:", res.data); 
      setThreats(res.data);
    });
  }, [page, search, category]);

  return (
    <div className="page-container">
      <h2>All Threats</h2>
      <div className="filters">
        <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
        <select onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Phishing">Phishing</option>
          <option value="Ransomware">Ransomware</option>
        </select>
      </div>
      <table className="threat-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {threats.map(t => (
            <tr key={t._id}>
              <td><Link to={`/threats/${t._id}`}>{t._id.slice(0, 6)}...</Link></td>
              <td>{t.Threat_Category}</td>
              <td>{t.Severity_Score}</td>
              <td>{t.Cleaned_Threat_Description?.slice(0, 50)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatList;
