// Framework compatibility layer for React and Preact
import type { ReactNode, ComponentType } from 'react'

// Type definitions that work with both React and Preact
export type FrameworkElement = ReactNode
export type FrameworkComponent<P = {}> = ComponentType<P>

// Export React hooks - Preact's hooks API is compatible
export {
  useState,
  useEffect,
  useContext,
  createContext,
  Children,
  isValidElement
} from 'react'