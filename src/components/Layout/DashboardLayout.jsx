import { Fade, Flex, ScaleFade, useBoolean, useToken } from "@chakra-ui/react";
import { ContentPanel, Navbar, Sidebar } from "components";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PuffLoader, PulseLoader } from "react-spinners";

export const DashboardLayout = ({ children }) => {
  const [playAnimation, setPlayAnimation] = useState(true);
  const [sidebarToggle, setSidebarToggle] = useBoolean();
  const [spinnerColor, blue200] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    ["cyan.500", "blue.200"]
  );

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(() => setPlayAnimation(false), 1000);
      // setPlayAnimation(false);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  return (
    <>
      <Flex
        flexDir="column"
        alignItems="stretch"
        flex="1"
        as={ScaleFade}
        in={!playAnimation}
        unmountOnExit
      >
        <Navbar setSidebarToggle={setSidebarToggle} />
        <Flex h="full" flex="1" alignItems="stretch">
          <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
          <ContentPanel>{children}</ContentPanel>
        </Flex>
      </Flex>
      <Flex
        as={ScaleFade}
        in={playAnimation}
        // bg="gray"
        flex={1}
        justifyContent="center"
        alignItems="center"
        unmountOnExit
      >
        <PuffLoader color={spinnerColor} size="100px" />
      </Flex>
    </>
  );
};
