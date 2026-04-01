// @ts-nocheck
/**
 * Theme test: JSX / TSX
 *
 * Covers: JSX elements, attributes, expressions, fragments,
 * component props, children, spread attributes.
 */

import React, { useState, useEffect, type ReactNode } from "react";

// ── Props & Types ───────────────────────────────────────────────────

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
}

interface CardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

type Theme = "light" | "dark";

// ── Components ──────────────────────────────────────────────────────

function Button({ label, onClick, disabled = false, variant = "primary", icon }: ButtonProps) {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled} type="button">
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}

function Card({ title, children, footer, className, ...rest }: CardProps & Record<string, unknown>) {
  return (
    <div className={`card ${className ?? ""}`} {...rest}>
      <header className="card-header">
        <h3>{title}</h3>
      </header>
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </div>
  );
}

// ── Hooks & State ───────────────────────────────────────────────────

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [theme]);

  const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
      <Button label={`Theme: ${theme}`} onClick={toggle} variant="secondary" />
      <Button
        label={`Count: ${count}`}
        onClick={() => setCount((c) => c + 1)}
        variant="primary"
      />
    </>
  );
}

// ── Conditional & List Rendering ────────────────────────────────────

function UserList({ users }: { users: Array<{ id: number; name: string; active: boolean }> }) {
  if (users.length === 0) {
    return <p className="empty-state">No users found.</p>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className={user.active ? "active" : "inactive"}>
          <span>{user.name}</span>
          {user.active && <span className="badge">Active</span>}
        </li>
      ))}
    </ul>
  );
}

// ── App ─────────────────────────────────────────────────────────────

export default function App() {
  const users = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true },
  ];

  return (
    <main className="app">
      <Card title="Remedy Theme" footer={<ThemeToggle />}>
        <p>
          A <strong>warm</strong>, comfortable color scheme with{" "}
          <em>orange accents</em>.
        </p>
        <UserList users={users} />
      </Card>
    </main>
  );
}
