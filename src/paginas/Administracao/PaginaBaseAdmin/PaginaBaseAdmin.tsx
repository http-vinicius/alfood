
import { Box, Container, Paper } from "@mui/material"
import { Outlet } from "react-router-dom";

import NavBar from '../../Components/NavBar/NavBar';

const PaginaBaseAdmin = () => {

  return (
    <>
      <NavBar />
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  )
};

export default PaginaBaseAdmin;