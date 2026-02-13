'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {
    const router = useRouter()
    const [data,setData] = useState("")
    
  const getUserDetails = async () => {
  try {
    const res = await axios.post("/api/users/me");
    setData(res.data.user._id);

  } catch (error: unknown) {

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401 || status === 500) {
        toast.error("Session expired. Please login again");
        router.push("/login");
        return;
      }

      toast.error(error.response?.data?.error || "Error fetching user");
    } else {
      toast.error("Something went wrong");
    }
  }
};

    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push("/login")
        } catch (error) {
           const errorMessage = error instanceof Error ? error.message : "An Unknown Error Occurred"
           console.log(errorMessage);
           toast.error(errorMessage)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1>Profile Page</h1>
       <hr />
       <h2>{data===""?"Nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
       <hr />
       <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
       <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}

export default ProfilePage
