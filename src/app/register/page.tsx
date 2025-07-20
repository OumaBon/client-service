'use client'

import { registerUser } from "@/lib/api"
import { useState } from "react"



export default function RegisterUser(){
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const handleRegister = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)

        try{
            await registerUser({username, email, password});
            alert("Registration Succesfull!")
            setUsername('')
            setEmail('')
            setPassword('')
        } catch(error){
            if (error instanceof Error){
            console.error("Registration Error:", error)
            alert(error.message || "Registration Failed")
            }
        
        }finally{
            setLoading(false)
        };
        
    }

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label htmlFor="Username">Username</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="Email">Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}>{ loading? 'Registering..': 'SignUp'}</button>

        </form>
    )


}