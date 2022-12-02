import React from "react"

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-br from-background-from to-transparent">
      {children}
    </div>
  )
}
