import { BrowserRouter as Router } from "react-router-dom";
import "./shared/forms/TraducoesYup";
import { AppRoutes } from "./routes";
import { DrawerLeft, Login } from "./shared/components";
import {
  DrawerProvider,
  AppThemeProvider,
  AuthProvider,
} from "./shared/contexts";

export default function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <Router>
              <DrawerLeft>
                <AppRoutes />
              </DrawerLeft>
            </Router>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}
