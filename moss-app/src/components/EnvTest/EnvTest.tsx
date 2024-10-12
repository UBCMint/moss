'use client'

// Client-side test to verify if .env file is correctly set up

import React, { useEffect, useState } from 'react'

interface ApiResponse {
  message?: string
  error?: string
}

const EnvTest: React.FC = () => {
  // set responses
  const [response, setResponse] = useState<ApiResponse>({})
  const [loading, setLoading] = useState<boolean>(true)

  // fetch request using process.env
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/headsets`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      } catch (error: any) {
        setResponse({ error: error.message })
      } finally {
        setLoading(false)
      }
    }
    fetchData().catch((error) => {
      setResponse({ error: error.message })
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <code className="font-mono font-bold">ENV Config Test</code>
      <p>Testing Headset API call</p>
      <br></br>
      {loading
        ? (<p>Loading...</p>)
        : (response.error != null)
            ? (<div style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
            Error: {response.error}
          </div>)
            : (<div style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
            .ENV Config Working
          </div>
              )}
    </div>
  )
}

export default EnvTest
