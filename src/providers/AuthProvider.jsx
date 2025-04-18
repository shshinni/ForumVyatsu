import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export function AuthProvider({ children }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/login_check",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          setUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [setUser]);

  return children;
}
