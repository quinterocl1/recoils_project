import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SignUpTwoPage = () =>{
    const navigate = useNavigate();  // Hook para redirección

    const handleRedirect = () => {
      navigate("/");  // Redirige a la página de login
    };
    return(
        <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          m: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
           
          }}
        >
          <img
            src="/img/image-3.png"
            alt="Image"
            style={{ width: "100%", height: 182 }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            <span style={{ color: "#44ac04" }}>REC</span>
            <span style={{ color: "#d4ac04" }}>OILS</span>
          </Typography>
        </Box>
        <Typography
          variant="typography/h6"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
        Solo falta un último paso...
        </Typography>
        <Stack direction="row" gap={2}> 
          <TextField fullWidth label="Contraseña" variant="outlined" defaultValue="Small"
          size="small" />
          <TextField fullWidth label="Confirmar contraseña" variant="outlined" defaultValue="Small"
          size="small" />
        </Stack>
             
        <Button fullWidth variant="contained" color="primary" sx={{ py: 2}}>
          Registarse
        </Button>
        <Link href="./forgotPassword" color="primary" sx={{ display: "block", mt: 1 }}>
        ¿Ya tienes una cuena? Ingresa Aquí
          </Link>
      </Box>
    </Container>
    )
}

export default SignUpTwoPage;