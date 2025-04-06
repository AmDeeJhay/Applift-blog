"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function Tabs({
  className,
  defaultValue = "", // Provide a default empty string
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsProps): JSX.Element {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue)

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  // Provide a context value that is never undefined
  const contextValue = React.useMemo(
    () => ({
      value: value || "", // Ensure value is never undefined
      onValueChange: handleValueChange,
    }),
    [value, handleValueChange],
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "inline-flex items-center justify-center rounded-md p-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    role="tablist"
    ref={ref}
    {...props}
  />
))
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => {
    // Safely access context
    const context = React.useContext(TabsContext)

    // If context is undefined, provide fallback values
    const selectedValue = context?.value || ""
    const onValueChange = context?.onValueChange || (() => {})

    const isSelected = selectedValue === value

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          className,
        )}
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        onClick={(event) => {
          onClick?.(event)
          onValueChange(value)
        }}
        {...props}
      />
    )
  },
)
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  // Safely access context
  const context = React.useContext(TabsContext)

  // If context is undefined, provide fallback values
  const selectedValue = context?.value || ""

  const isSelected = selectedValue === value

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      ref={ref}
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      hidden={!isSelected}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

