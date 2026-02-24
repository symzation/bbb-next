import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined
    height: number | undefined
  }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size on mount
    if (typeof window !== 'undefined') {
      handleResize()
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize