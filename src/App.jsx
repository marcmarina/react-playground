import React from "react";

import { Box, Button, Typography, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
        Hello world!
      </Typography>

      <Box
        maxWidth={"600px"}
        margin="auto"
        border={`1px solid ${theme.palette.grey[400]}`}
        borderRadius={1}
        p={2}
      >
        <Typography mb={2} textAlign={"center"} as={"h2"} variant="h5">
          Header
        </Typography>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={2}
        >
          <Button variant="contained" color="success">
            Proceed
          </Button>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
