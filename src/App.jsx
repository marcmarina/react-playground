import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <Box p={6}>
      <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
        Hello world!
      </Typography>
    </Box>
  );
}

export default App;
