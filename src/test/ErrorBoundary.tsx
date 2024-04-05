import React , {useEffect , useState} from "react";

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC <Props>= ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any, errorInfo: any) => {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    setHasError(true);
  };

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;