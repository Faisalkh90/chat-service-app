import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/Routes";

export default function App() {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}
