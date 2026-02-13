'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function VerifyEmailPage() {

  const searchParams = useSearchParams()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async (token: string) => {
    try {
      await axios.post("/api/users/verifyEmail", { token })
      setVerified(true)
      setError(false)
    } catch (error) {
      setError(true)

      let errorMessage = "Something went wrong"
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || "Server error"
      }
      console.log(errorMessage)
    }
  }

  // get token from URL
  useEffect(() => {
    setError(false)
    const urlToken = searchParams.get("token")
    if (urlToken) setToken(urlToken)
  }, [searchParams])

  // verify
  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail(token)
    }
  }, [token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-white'>
      <h1 className='text-4xl'>Verify Email</h1>

      <h2 className='p-2 bg-orange-500 text-black'>
        {token || "No Token"}
      </h2>

      {verified && (
        <div className='mt-4'>
          <h2>Email Verified ✅</h2>
          <Link href="/login" className='text-blue-400 underline'>Login</Link>
        </div>
      )}

      {error && (
        <div className='mt-4'>
          <h2>Invalid or expired token ❌</h2>
        </div>
      )}
    </div>
  )
}

export default VerifyEmailPage
