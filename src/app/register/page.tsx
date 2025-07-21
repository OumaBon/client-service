'use client';

import React, { useState } from "react";
import { registerUser } from "@/lib/registerApi";
import isRegisterError from "@/lib/isRegisterError";
import { useRouter } from "next/navigation"; 



export default function RegisterPage() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await registerUser({ username, email, password });
      console.log("Registered user:", res.user);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      if (isRegisterError(err)) {
        const message =
          (err.errors && Object.values(err.errors).flat().join(', ')) ||
          err.message ||
          "Registration failed. Please try again.";
        setError(message);
      } else {
        setError("User already exists. Please login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegisterUser} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Registration successful! Redirecting to login...</p>}
    </form>
  );
}
