import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/Routes";
import { Provider } from "react-redux";

import store from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <AllRoutes />
      </Router>
    </Provider>
  );
}
