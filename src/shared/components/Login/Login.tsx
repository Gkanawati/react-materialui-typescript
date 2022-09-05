import { useState } from "react";
import * as yup from "yup";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useAuthContext } from "../../contexts";

interface ILoginProps {
  children: React.ReactNode;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) return <>{children}</>;

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      )
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={300}>
            <Typography variant="h6" align="center">
              Identifique-se
            </Typography>

            <TextField
              value={email}
              error={!!emailError}
              helperText={emailError}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError("")}
              fullWidth
              label="Email"
            />
            <TextField
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError("")}
              fullWidth
              label="Senha"
              type="password"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {!isLoading ? (
                "Entrar"
              ) : (
                <CircularProgress
                  variant="indeterminate"
                  color="inherit"
                  size={20}
                />
              )}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
