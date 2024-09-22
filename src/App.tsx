import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Add A&E Admission
                </p>
                <label htmlFor="admitting-diagnosis">Addmitting Diagnosis</label>
                <input id="admitting-diagnosis" />
            </header>
        </div>
    );
}

export default App;