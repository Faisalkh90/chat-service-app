import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";

import store from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { toast } from "react-toastify";

export default function App() {
  const [socket, setSocket] = useState() as any;

  function setUpSocket() {
    const newSocket = io("http://localhost:8080", {
      query: {
        token: JSON.parse(localStorage.getItem("userInfo")!)["authToken"],
      },
    });

    newSocket.on("disconnect", () => {
      setSocket(null);

      setTimeout(setUpSocket, 3000);
      toast.error("Socket Disconnected!");
    });

    newSocket.on("connection", () => {
      toast.success("Socket Connection");

      setSocket(newSocket);
    });
  }
  useEffect(() => {
    setUpSocket();
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <AllRoutes />
      </Router>
    </Provider>
  );
}
