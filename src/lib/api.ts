const API_URL = "http://localhost:5000/api";

// -------------------- AUTH --------------------
export async function fetchMe() {
  const res = await fetch(`${API_URL}/me`, { credentials: "include" });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // куки додаються автоматично
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}

// -------------------- PRODUCTS --------------------
export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createProduct(name: string, price: number, description: string) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, description }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}
