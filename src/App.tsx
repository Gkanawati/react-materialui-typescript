import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DrawerLeft } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts";

export default function App() {
  return (
    <AppThemeProvider>
      <Router>
        <DrawerLeft>
          <AppRoutes />
        </DrawerLeft>
      </Router>
    </AppThemeProvider>
  );
}
