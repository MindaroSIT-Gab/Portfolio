import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.PROD ? 'https://your-production-backend.com' : 'http://localhost:5000';

const SecretBunker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${BACKEND_URL}/api/secret/login`, { password });
      if (res.data.success) {
        setIsAuthenticated(true);
        fetchMessages();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Access Denied');
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/secret/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error('Fetch failed');
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Delete entry?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/secret/messages/${id}`);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await axios.put(`${BACKEND_URL}/api/secret/messages/${id}`, { message: editContent });
      setMessages(messages.map(m => (m._id === id ? { ...m, message: editContent } : m)));
      setEditingId(null);
    } catch (err) {
      console.error('Update failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-black text-light d-flex align-items-center" style={{ zIndex: 9999 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card bg-dark border-secondary shadow-lg">
                <div className="card-body p-4">
                  <h3 className="text-center mb-4 text-danger">Bunker Access</h3>
                  {error && <div className="alert alert-danger bg-danger text-white border-0 py-2 small">{error}</div>}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <input 
                        type="password" 
                        className="form-control bg-black text-light border-secondary" 
                        placeholder="Security Key" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 py-2">Unlock</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black text-light overflow-auto py-5" style={{ zIndex: 9999 }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
          <h2 className="text-danger">Bunker Inbox <span className="badge bg-danger fs-6">{messages.length}</span></h2>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setIsAuthenticated(false)}>Exit Bunker</button>
        </div>
        <div className="row">
          {messages.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted italic">Vault is empty.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <article key={msg._id} className="col-md-6 mb-4">
                <div className="card h-100 bg-dark border-secondary shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                      <h6 className="mb-0 text-danger">{msg.name}</h6>
                      <small className="text-muted">{msg.email}</small>
                    </div>
                    {editingId === msg._id ? (
                      <div className="mb-3">
                        <textarea className="form-control bg-black text-light border-secondary mb-2" rows={4} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleEdit(msg._id)}>Save</button>
                        <button className="btn btn-outline-light btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <p className="flex-grow-1 text-light-50" style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                    )}
                    <div className="d-flex gap-2 mt-auto pt-3 border-top border-secondary">
                      <button className="btn btn-link text-secondary p-0 text-decoration-none btn-sm" onClick={() => { setEditingId(msg._id); setEditContent(msg.message); }} >Edit</button>
                      <a href={`mailto:${msg.email}?subject=Bunker Reply`} className="btn btn-link text-info p-0 text-decoration-none btn-sm">Reply</a>
                      <button className="btn btn-link text-danger p-0 text-decoration-none btn-sm ms-auto" onClick={() => deleteMessage(msg._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretBunker;
