import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import BackupRestore from './components/BackupRestore';
import { FiSettings, FiDatabase } from 'react-icons/fi';
import './styles/App.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showBackupRestore, setShowBackupRestore] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="header-actions">
            <button
              className="btn-icon"
              onClick={() => setShowBackupRestore(true)}
              title="Backup & Restore"
            >
              <FiDatabase />
            </button>
            <button
              className="btn-icon"
              onClick={() => setShowSettings(true)}
              title="Settings"
            >
              <FiSettings />
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <TaskList />
      </main>
      
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
      
      {showBackupRestore && (
        <BackupRestore onClose={() => setShowBackupRestore(false)} />
      )}
    </div>
  );
}

export default App;
