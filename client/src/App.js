import { useState } from 'react';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState({ firestoreQuery: '', data: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const result = await response.json();
      setQueryResult(result);
      setInput('');
    } catch (error) {
      console.error('Error fetching query:', error);
      setQueryResult({ firestoreQuery: '', data: [] });
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="container">
          <h1>QuickQuery</h1>
        </div>
      </header>
      <main className="main container">
        <div className="query-input">
          <form onSubmit={handleSubmit} className="query-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'show users older than 25 from Chicago'"
              className="query-input-field"
            />
            <button type="submit" className="query-submit-button">
              Submit
            </button>
          </form>
        </div>
        <div className="result-section">
          <h2>Firestore Query</h2>
          <pre className="query-display">
            {queryResult.firestoreQuery || 'No query executed'}
          </pre>
          <h2>Results</h2>
          {queryResult.data.length > 0 ? (
            <table className="result-table">
              <thead>
                <tr>
                  {Object.keys(queryResult.data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value.toString()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;