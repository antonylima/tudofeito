import React, { useState } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';
import backupService from '../services/backupService';

const BackupRestore = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await backupService.exportData();
      
      // Create a blob and download link
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `task-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setMessage('Backup exported successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error exporting backup');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!data.tasks || !data.settings) {
        throw new Error('Invalid backup file format');
      }
      
      await backupService.importData(data);
      
      setMessage('Backup imported successfully. Please refresh the page.');
      setTimeout(() => {
        setMessage('');
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage('Error importing backup: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backup-restore-overlay">
      <div className="backup-restore-container">
        <div className="backup-restore-header">
          <h2>Backup & Restore</h2>
          <button className="btn-icon" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="backup-restore-content">
          <div className="backup-section">
            <h3>Export Data</h3>
            <p>Download a backup of all your tasks and settings.</p>
            <button
              className="btn-primary"
              onClick={handleExport}
              disabled={loading}
            >
              <FiDownload /> {loading ? 'Exporting...' : 'Export Backup'}
            </button>
          </div>
          
          <div className="restore-section">
            <h3>Import Data</h3>
            <p>Restore your tasks and settings from a backup file.</p>
            <label className="btn-secondary">
              <FiUpload /> {loading ? 'Importing...' : 'Import Backup'}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={loading}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;
