import { Box } from "@chakra-ui/react";
import _ from "lodash";

export const ContentPanel = ({ children }) => {
  return (
    <Box
      w={{ base: "100vw", sm: "calc(100vw - 250px)" }}
      h="calc(100vh - 60px)"
      overflowY="auto"
      position="sticky"
      top={0}
      // p={4}
    >
      {children}
    </Box>
  );
};
