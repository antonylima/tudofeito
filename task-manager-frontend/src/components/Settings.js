import React, { useState, useEffect } from 'react';
import { FiSettings, FiSave } from 'react-icons/fi';
import settingsService from '../services/settingsService';

const Settings = ({ onClose }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        setMessage('Error loading settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsService.updateSettings(settings);
      setMessage('Settings saved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <div className="settings-header">
          <h2><FiSettings /> Settings</h2>
          <button className="btn-icon" onClick={onClose}>
            ×
          </button>
        </div>
        
        {loading ? (
          <div className="loading">Loading settings...</div>
        ) : (
          <div className="settings-content">
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dateFormat">Date Format</label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleChange}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            {message && <div className="message">{message}</div>}
            
            <div className="form-actions">
              <button
                className="btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
