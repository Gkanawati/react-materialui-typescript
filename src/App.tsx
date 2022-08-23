import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts";

export default function App() {
  return (
    <AppThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppThemeProvider>
  );
}
