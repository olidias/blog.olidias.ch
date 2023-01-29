import React from "react"

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-b from-background-2 via-background-3 to-background-5 h-full w-full flex justify-center">
      <div className="flex flex-col md:w-1/2 w-5/6 items-center min-h-screen">
        {children}
      </div>
    </div>
  )
}