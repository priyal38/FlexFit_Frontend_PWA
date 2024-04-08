import React, { useState } from 'react'


const useLoading = () => {
    const [loading, setLoading] = useState(false);

    
    const stopLoading = () => setLoading(false);
    const startLoading = () => setLoading(true);
  
    return { loading, stopLoading , startLoading };
}

export default useLoading