import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api/threats';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(res => {
        console.log("Stats from backend:", res.data); 
        setStats(res.data);
    });
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  const categoryChartData = {
    labels: stats.categories.map(c => c.category),
    datasets: [{
      label: 'Threats by Category',
      data: stats.categories.map(c => c.count),
      backgroundColor: '#3b82f6',
    }]
  };

  const severityChartData = {
    labels: stats.severities.map(s => s.severity),
    datasets: [{
      label: 'Threats by Severity',
      data: stats.severities.map(s => s.count),
      backgroundColor: ['#ef4444', '#f97316', '#facc15', '#10b981'],
    }]
  };

  return (
    <div className="page-container">
      <h2>Threat Intelligence Dashboard</h2>

      <div className="cards">
        <div className="card large">
          <h3>Total Threats</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h4>By Category</h4>
          <Bar data={categoryChartData} />
        </div>

        <div className="chart">
          <h4>By Severity</h4>
          <Doughnut data={severityChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
