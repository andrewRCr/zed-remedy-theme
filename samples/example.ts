/**
 * Theme test: TypeScript
 *
 * Covers: keywords, functions, strings, types, interfaces, enums,
 * classes, generics, decorators, template literals, regex, JSX.
 *
 * @see https://github.com/robertrossmann/vscode-remedy
 * @todo Compare against VS Code Remedy
 */

import { EventEmitter } from "events";

// ── Constants & Primitives ──────────────────────────────────────────

const MAX_RETRIES = 3;
const PI = 3.14159;
const ENABLED = true;
const NOTHING = null;
const MISSING = undefined;

// ── Enums ───────────────────────────────────────────────────────────

enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Disabled = "DISABLED",
}

// ── Interfaces & Types ──────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  status: Status;
  metadata?: Record<string, unknown>;
}

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

// ── Decorators ──────────────────────────────────────────────────────

function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}

// ── Classes ─────────────────────────────────────────────────────────

class UserService extends EventEmitter {
  private users: Map<number, User> = new Map();
  private static instance: UserService;

  protected constructor(private readonly baseUrl: string) {
    super();
  }

  static getInstance(baseUrl: string): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(baseUrl);
    }
    return UserService.instance;
  }

  @logged
  async fetchUser(id: number): Promise<Result<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const user: User = await response.json();
      this.users.set(id, user);
      this.emit("user:fetched", user);

      return { ok: true, value: user };
    } catch (error) {
      return { ok: false, error: error as Error };
    }
  }

  findUsers(predicate: (user: User) => boolean): User[] {
    return [...this.users.values()].filter(predicate);
  }
}

// ── Generics & Utility Types ────────────────────────────────────────

function pipe<A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (a: A) => C {
  return (a) => fn2(fn1(a));
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ── Regex ───────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

// ── String varieties ────────────────────────────────────────────────

const single = 'single quotes';
const double = "double quotes";
const template = `Hello, ${single}! The value of PI is ${PI}`;
const escaped = "Line one\nLine two\tTabbed";
const tagged = String.raw`No \n escape here`;

// ── Control flow ────────────────────────────────────────────────────

async function processUsers(service: UserService): Promise<void> {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    const result = await service.fetchUser(i);

    if (result.ok) {
      const { name, status } = result.value;

      switch (status) {
        case Status.Active:
          console.log(`Active user: ${name}`);
          break;
        case Status.Pending:
          console.warn(`Pending user: ${name}`);
          break;
        default:
          console.error(`Unexpected status for ${name}`);
      }
    } else {
      console.error(result.error.message);
    }
  }
}

// ── JSX (TSX) ───────────────────────────────────────────────────────

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ label, onClick, disabled = false, variant = "primary" }: ButtonProps) {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export { UserService, Button, Status, processUsers };
export type { User, Result, ButtonProps };
