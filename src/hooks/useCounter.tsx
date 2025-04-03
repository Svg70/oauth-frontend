"use client"

import { useState } from "react"

export const useCounter = () => {
  const [value, setValue] = useState(0)
  const increment = () => setValue((prev) => prev + 1)
  const decrement = () => setValue((prev) => prev - 1)
  const reset = () => setValue(0)

  return { value, increment, decrement, reset }
}

