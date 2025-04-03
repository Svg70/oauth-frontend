"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <div className="text-center space-y-4">
        <p className="text-xl">Welcome, {user.name}!</p>
        <p>This is your profile page that only you can see when authenticated.</p>
        <img src={user.picture || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full mx-auto" />
        <div className="mt-6">
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

