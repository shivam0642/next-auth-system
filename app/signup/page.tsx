'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function SignupPage() {

  const router = useRouter()

  const [user,setUser] = useState({
     email:"",
     password:"",
     username:""
  })

  const [buttondisabled,setButtonDisabled] = useState(false)

  const [loading,setLoading] = useState(false)

  const onSignup = async ()=>{
    try {
       setLoading(true);
       const response = await axios.post("/api/users/signup",user)
       console.log("Signup Success",response.data); 
       router.push('/login')
       
    } catch (error) {
      console.log("SignUp Failed");
      const errorMessage = error instanceof Error ? error.message : "An Unknown error occurred"
      toast.error(errorMessage)
    }
  }

  const buttonDisabled = !user.email || !user.password || !user.username

  return (
   <div className="min-h-screen flex items-center justify-center bg-black px-4">
  <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800">

    <h1 className="text-3xl font-bold text-center mb-2">
      {loading ? "Processing..." : "Create Account"}
    </h1>

    {/* Username */}
    <div className="mb-5">
      <label className="block text-sm mb-2 text-neutral-300">Username</label>
      <input
        id="username"
        value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder="Enter username"
        type="text"
        className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 
                   focus:outline-none focus:border-white transition"
      />
    </div>

    {/* Email */}
    <div className="mb-5">
      <label className="block text-sm mb-2 text-neutral-300">Email</label>
      <input
        id="email"
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder="Enter email"
        type="email"
        className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 
                   focus:outline-none focus:border-white transition"
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-sm mb-2 text-neutral-300">Password</label>
      <input
        id="password"
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder="Enter password"
        type="password"
        className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 
                   focus:outline-none focus:border-white transition"
      />
    </div>

    {/* Button */}
    <button
      onClick={onSignup}
      disabled={buttonDisabled}
      className={`w-full py-2 rounded-lg font-semibold transition 
      ${buttonDisabled 
        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" 
        : "bg-white text-black hover:bg-gray-200"}`}
    >
      {loading ? "Creating Account..." : "Sign Up"}
    </button>
    

  </div>
</div>

  )
}

export default SignupPage
