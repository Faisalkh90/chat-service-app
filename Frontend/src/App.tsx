import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./Store";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AllRoutes />
      </Router>
    </Provider>
  );
}
