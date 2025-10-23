import React, { createContext, useContext, useState } from 'react'
import { cn } from '../../lib/utils'

interface PopoverContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PopoverContext = createContext<PopoverContextType | null>(null)

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover: React.FC<PopoverProps> = ({ 
  children, 
  open: controlledOpen, 
  onOpenChange 
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  
  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }

  return (
    <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      <div className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ 
  children, 
  asChild = false,
  ...props 
}) => {
  const context = useContext(PopoverContext)
  
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover')
  }

  const handleClick = () => {
    context.onOpenChange(!context.open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props
    })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const PopoverContent: React.FC<PopoverContentProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  const context = useContext(PopoverContext)
  
  if (!context) {
    throw new Error('PopoverContent must be used within a Popover')
  }

  if (!context.open) {
    return null
  }

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Popover, PopoverTrigger, PopoverContent }