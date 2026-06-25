import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "db.json");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const readDb = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return { users: [], lists: {}, history: {} };
  }
};

const writeDb = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  const db = readDb();
  const normalized = email?.trim().toLowerCase();

  if (db.users.find((u) => u.email === normalized)) {
    return res.status(400).json({ error: "Email already exists." });
  }

  const user = {
    id: crypto.randomUUID(),
    name: name?.trim(),
    email: normalized,
    password,
  };

  db.users.push(user);
  writeDb(db);
  res.json({ id: user.id, name: user.name, email: user.email });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find(
    (u) => u.email === email?.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
});

app.get("/api/mylist/:userId", (req, res) => {
  const db = readDb();
  res.json(db.lists[req.params.userId] || []);
});

app.post("/api/mylist/:userId", (req, res) => {
  const db = readDb();
  db.lists[req.params.userId] = req.body.list || [];
  writeDb(db);
  res.json({ success: true });
});

app.get("/api/history/:userId", (req, res) => {
  const db = readDb();
  res.json(db.history[req.params.userId] || []);
});

app.post("/api/history/:userId", (req, res) => {
  const db = readDb();
  db.history[req.params.userId] = req.body.history || [];
  writeDb(db);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Netflix clone API running on http://localhost:${PORT}`);
});
