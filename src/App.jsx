import React from "react";

import { Box, colors } from "@mui/material";
import Grid from "@mui/material/Grid2";

function App() {
  return (
    <Box p={2} display="flex" justifyContent={"center"}>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          maxWidth: "lg",
        }}
      >
        {Array(6)
          .fill(0)
          .map((_, i) => {
            return (
              <Grid key={i} size={[12, 6, 3]}>
                <Box
                  sx={{
                    bgcolor: colors.red[(i + 1) * 100],
                    p: 8,
                    borderRadius: 2,
                  }}
                >
                  size=8
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default App;
