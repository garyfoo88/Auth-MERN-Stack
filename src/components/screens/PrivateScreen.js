import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function PrivateScreen() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        history.push("/login")
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateData();
  }, [history]);

  const onLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default PrivateScreen;
