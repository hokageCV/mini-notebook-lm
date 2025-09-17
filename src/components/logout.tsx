"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded shadow cursor-pointer"
    >
      Logout
    </button>
  )
}
