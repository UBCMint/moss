// Client-side test to verify if .env file is correctly set up

'use client';
import React, { useEffect, useState } from 'react';

interface ApiResponse {
    message?: string;
    error?: string;
  }

const Env_test: React.FC = () => {
    // set responses
    const [response, setResponse] = useState<ApiResponse>({});
    const [loading, setLoading] = useState<boolean>(true);


    // fetch request using process.env
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/headsets`);

            if (!res.ok) {
              throw new Error(`API call failed with status: ${res.status}`);
            }

          } catch (error: any) {

            setResponse({ error: error.message || `Failed to fetch headset data`});

          } finally {

            setLoading(false);

          }
        };
    
        fetchData();
      }, []);
      
    return (
        <div>
        <code className="font-mono font-bold">ENV Config Test</code>
        <p>Testing Headset API call</p>

        <br></br>
        
          {loading ? (

            <p>Loading...</p>

          ) : response.error ? (

            <div style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
                Error: {response.error}
            </div>

          ) : (

          <div style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
            .ENV Config Working
          </div>

          )}
        </div>
      );
  };

export default Env_test;