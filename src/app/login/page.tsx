'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/api' // adjust if needed

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await loginUser({ email, password })
      localStorage.setItem('access_token', res.access_token)
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Login failed')
      }
    }
  }

  return (
    <form onSubmit={handleLogin} className='space-y-4 max-w-md mx-auto mt-10'>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
    </form>
  )
}
