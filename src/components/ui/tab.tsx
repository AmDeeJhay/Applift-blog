"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  active?: boolean
}

export function Tab({ className, value, active, children, ...props }: TabProps): JSX.Element {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

