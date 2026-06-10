import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signIn() {
    setIsAuthenticated(true);
  }

  function signOut() {
    setIsAuthenticated(false);
  }

  return { isAuthenticated, signIn, signOut };
}
