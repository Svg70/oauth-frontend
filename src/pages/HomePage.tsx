"use client"

import { useAuth } from "@/context/AuthContext"
import { FcGoogle } from "react-icons/fc"

export default function HomePage() {
  const { user, login } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <h1 className="text-3xl font-bold">Welcome to OAuth Demo</h1>

      {user ? (
        <div className="text-center space-y-4">
          <p className="text-xl">You are logged in as {user.name}</p>
          <img src={user.picture || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full mx-auto" />
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl">Please sign in to continue</p>
          <button
            onClick={login}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-md shadow-md hover:shadow-lg transition-all border border-gray-300"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>
      )}
    </div>
  )
}

