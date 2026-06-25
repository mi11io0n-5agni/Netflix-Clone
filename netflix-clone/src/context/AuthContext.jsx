import { createContext, useContext, useEffect, useState } from "react";

const USERS_KEY = "netflix_users";
const SESSION_KEY = "netflix_session";

const AuthContext = createContext(null);

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      setUser(session ? JSON.parse(session) : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    const session = { id: found.id, email: found.email, name: found.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const signup = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    saveUsers([...users, newUser]);

    const session = { id: newUser.id, email: newUser.email, name: newUser.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
