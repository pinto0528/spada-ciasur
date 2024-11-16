import { useState, useEffect } from "react";

const SessionButton = ({ onSessionChange }: { onSessionChange: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSession = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      window.location.reload();
      setIsLoggedIn(false);
    } else {
      window.location.href = "/login";
    }
    onSessionChange(); // Llama al callback para actualizar el padre
  };

  return (
    <button onClick={handleSession}>
      {isLoggedIn ? "Sign out" : "Sign in"}
    </button>
  );
};

export default SessionButton;
