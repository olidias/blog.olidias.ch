import React from "react"

export default function Layout({ children }) {
  return (
    <div className="bg-background w-full flex justify-center min-h-full pb-10">
      <div className="flex flex-col md:w-1/2 w-5/6 items-center min-h-screen">
        {children}
      </div>
    </div>
  )
}