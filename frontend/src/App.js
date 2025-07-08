import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ThreatList from './components/ThreatList';
import ThreatDetail from './components/ThreatDetail';
import AnalyzeForm from './components/AnalyzeForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h2>Threat Intelligence</h2>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/threats">Threats</Link>
            <Link to="/analyze">Analyze Threat</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/threats" element={<ThreatList />} />
          <Route path="/threats/:id" element={<ThreatDetail />} />
          <Route path="/analyze" element={<AnalyzeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;