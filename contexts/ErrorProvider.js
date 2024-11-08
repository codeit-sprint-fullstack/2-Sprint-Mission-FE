import Toast from "@/components/Toast";
import { createContext, useContext, useEffect, useState } from "react";
const ErrorContext = createContext();
export default function ErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const handleError = (e) => setError(e);
  const clearError = () => setError(null);
  return (
    <ErrorContext.Provider value={{ handleError, error, clearError }}>
      {children}
      {error && <Toast message={error.message} onClose={clearError} />}
    </ErrorContext.Provider>
  );
}
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("반드시 ErrorProvider 안에서 사용해야 됩니다");
  return context;
};
