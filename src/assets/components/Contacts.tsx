import { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

// Update this to http://localhost:5000 for local testing
const BACKEND_URL = import.meta.env.PROD 
  ? 'https://your-production-backend.com' 
  : 'http://localhost:5000';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // 1. Save message to your MongoDB via your Express backend
      const res = await axios.post(`${BACKEND_URL}/api/contact`, formData);

      if (res.data.success) {
        // 2. If DB save is successful, trigger the Email Notification
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            {
              user_name: formData.name,
              user_email: formData.email,
              message: formData.message,
              time: new Date().toLocaleString()
            },
            import.meta.env.VITE_EMAIL_PUBLIC_KEY
          );
        } catch (emailError) {
          // We log the email error but don't stop the success message 
          // because the data is already safely in your MongoDB bunker.
          console.error("EmailJS Error:", emailError);
        }

        setStatus('Success! Message received in the bunker.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err: any) {
      if (err.response) {
        setStatus(`Server Error (${err.response.status}): ${err.response.data.error || 'Check backend'}`);
      } else if (err.request) {
        setStatus("Network Error: Is your backend running on port 5000?");
      } else {
        setStatus(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container" style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            name="name" 
            className="form-control"
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            className="form-control"
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <textarea 
            name="message" 
            className="form-control"
            placeholder="Write your message..." 
            rows={5}
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
          <button 
            type="submit" 
            className="btn btn-dark"
            disabled={loading}
          >
            {loading ? 'Sending to Bunker...' : 'Send Message'}
          </button>
        </div>
        
        {status && (
          <p style={{ 
            marginTop: '15px', 
            textAlign: 'center',
            color: status.startsWith('Success') ? '#28a745' : '#dc3545',
            fontWeight: 'bold'
          }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
