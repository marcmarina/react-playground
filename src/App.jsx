import React from "react";

import { Box, colors, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

function App() {
  const theme = useTheme();

  return (
    <Box p={2} display="flex" justifyContent={"center"}>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          maxWidth: theme.breakpoints.values.xl,
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
