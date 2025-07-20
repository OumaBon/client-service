'use client';

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.access_token) { 
        setAuthToken(response.access_token); 
        router.push('/dashboard');
      } else {
        alert('Invalid login credentials.');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Email Address</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
