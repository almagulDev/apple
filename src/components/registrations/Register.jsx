import React, { useState } from "react";
import scss from "./Register.module.scss";
import { useAuth } from "../../context/AuthContext";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, error, signInWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //! MUI
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  //! MUI

  const handleRegister = () => {
    register(name, surname, email, password);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    navigate("/list");
  };

  return (
    <div className={scss.register}>
      <div className={scss.content}>
        {error && <Alert severity="error">{error}</Alert>}
        <h1>SIGN UP</h1>
        <TextField
          onChange={(e) => setName(e.target.value)}
          className={scss.inputs}
          id="outlined-basic"
          label="Name:"
          variant="outlined"
          value={name}
        />
        <TextField
          onChange={(e) => setSurname(e.target.value)}
          className={scss.inputs}
          id="outlined-basic"
          label="Surname:"
          variant="outlined"
          value={surname}
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          className={scss.inputs}
          id="outlined-basic"
          label="Email:"
          variant="outlined"
          value={email}
        />
        <FormControl className={scss.inputs} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
          />
        </FormControl>
        <Button
          onClick={handleRegister}
          className={scss.btn_register}
          variant="contained"
        >
          Sign Up
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography>Do you already have an account?</Typography>
          <NavLink
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
            to="/login"
          >
            Login
          </NavLink>
        </Box>
        <Button
          onClick={() => signInWithGoogle()}
          className={scss.btn_google}
          variant="outlined"
        >
          <GoogleIcon /> Google
        </Button>
      </div>
    </div>
  );
};

export default Register;
