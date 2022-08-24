import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { DrawerLeft } from "./shared/components";
import { DrawerProvider, AppThemeProvider } from "./shared/contexts";

export default function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <Router>
          <DrawerLeft>
            <AppRoutes />
          </DrawerLeft>
        </Router>
      </DrawerProvider>
    </AppThemeProvider>
  );
}
