const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: (origin, cb) => {
        if (!origin || origin.includes('github.io') || origin.includes('localhost')) {
            return cb(null, true);
        }
        cb(new Error('CORS blocked'));
    },
    credentials: true
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gabrielmindaro_db_user:test1234@cluster0.wpkpjtf.mongodb.net/Portfolio?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4 
})
.then(() => console.log('Connected'))
.catch(err => console.error(err));

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'contacts' });

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "Missing fields" });
        }
        const saved = await new Contact({ name, email, message }).save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/secret/login', (req, res) => {
    const isAuth = req.body?.password === (process.env.SECRET_PASSWORD || 'test1234');
    res.status(isAuth ? 200 : 401).json({ success: isAuth });
});

app.get('/api/secret/messages', async (req, res) => {
    try {
        const msgs = await Contact.find().sort({ createdAt: -1 });
        res.json(msgs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/secret/messages/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id, 
            { message: req.body.message }, 
            { new: true }
        );
        res.json({ success: !!updated, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/secret/messages/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
