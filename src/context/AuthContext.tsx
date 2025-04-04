"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

// Define user type
type User = {
  id: string
  name: string
  email: string
  picture: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: () => void
  logout: () => void
  handleAuthCallback: () => Promise<boolean>
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
  handleAuthCallback: async () => false,
})

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"
const REDIRECT_URI = `https://wallet.aucburg.com/callback`
const SCOPE = "email profile"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("auth_user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoading, setIsLoading] = useState(false)

  // Initiate Google OAuth login
  const login = useCallback(() => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`
    window.location.href = authUrl
  }, [])

  // Handle the OAuth callback
  const handleAuthCallback = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Extract access token from URL hash
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const accessToken = params.get("access_token")

      if (!accessToken) {
        console.error("No access token found")
        setIsLoading(false)
        return false
      }

      // Fetch user info from Google
      //here backend call?
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }

      const userData = await response.json()

      // Create user object
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      }

      // Save user to state and localStorage
      setUser(user)
      localStorage.setItem("auth_user", JSON.stringify(user))

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Authentication error:", error)
      setIsLoading(false)
      return false
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, handleAuthCallback }}>
      {children}
    </AuthContext.Provider>
  )
}

