'use client'

import { useEffect } from 'react'

const TestGA = () => {
  useEffect(() => {
    console.log(`Initialize GA : ${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`)
  }, [])
  return null
}

export default TestGA
