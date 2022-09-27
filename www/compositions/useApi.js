import { useEffect } from 'react';

export default function useApi({ onMessages, token }) {
  // Get webhook's info
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json();
      console.log(data.data)

      onMessages(data.data)
    }
    fetchData()
  }, []);
}
