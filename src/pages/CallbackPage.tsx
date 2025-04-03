"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function CallbackPage() {
  const { handleAuthCallback, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const processAuth = async () => {
      const success = await handleAuthCallback()
      if (success) {
        navigate("/profile")
      } else {
        navigate("/")
      }
    }

    processAuth()
  }, [handleAuthCallback, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-2xl font-semibold mb-4">Processing authentication...</h1>
      {isLoading && (
        <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      )}
    </div>
  )
}

