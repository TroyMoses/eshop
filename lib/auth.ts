export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Dummy users for testing
const DUMMY_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
];

// Generate a simple JWT-like token (for demo purposes)
export function generateToken(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

// Verify token
export function verifyToken(token: string): { userId: string } | null {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

// Simulate API calls to FastAPI backend
export async function loginUser(
  credentials: LoginCredentials
): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = DUMMY_USERS.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    const token = generateToken(user.id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  return null;
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user already exists
  const existingUser = DUMMY_USERS.find((u) => u.email === credentials.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const newUser = {
    id: String(DUMMY_USERS.length + 1),
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
  };

  DUMMY_USERS.push(newUser);

  const token = generateToken(newUser.id);
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    token,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const user = DUMMY_USERS.find((u) => u.id === id);
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: "", // Don't return token in user lookup
    };
  }
  return null;
}
