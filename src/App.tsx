import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import CallbackPage from "@/pages/CallbackPage"
import ProfilePage from "@/pages/ProfilePage"
import { AuthProvider } from "@/context/AuthContext"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="max-w-xl mx-auto p-6 space-y-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

