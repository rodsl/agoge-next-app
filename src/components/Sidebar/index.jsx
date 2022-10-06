import {
  Box,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiFilePlus, FiHome } from "react-icons/fi";

import _ from "lodash";
import { Overlay } from "components";

export const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const lightMode = useColorModeValue(true, false);

  const propsLoader = () =>
    useBreakpointValue({
      base: {
        isOpen: sidebarToggle,
        as: Overlay,
        placement: "top",
        onClose: setSidebarToggle.toggle,
      },
      sm: {},
    });

  return (
    <Stack
      {...propsLoader()}
      bg={lightMode ? "gray.200" : "gray.700"}
      w={{ base: "100vw", sm: "250px" }}
      h="calc(100vh - 60px)"
      overflowY="auto"
      position="sticky"
      top="60px"
      p={{ base: 0, sm: 4 }}
    >
      <Heading size="md" display={{ base: "block", sm: "none" }}>
        Agoge App
      </Heading>
      <Stack>
        <NextLink href="/" passHref>
          <Link
            as={HStack}
            p={2}
            rounded="xl"
            _hover={{
              bg: "gray.300",
            }}
            onClick={setSidebarToggle.off}
          >
            <Icon as={FiHome} /> <Text>Home</Text>
          </Link>
        </NextLink>
        <NextLink href="/cadastros" passHref>
          <Link
            as={HStack}
            p={2}
            rounded="xl"
            _hover={{
              bg: "gray.300",
            }}
            onClick={setSidebarToggle.off}
          >
            <Icon as={FiFilePlus} /> <Text>Cadastros</Text>
          </Link>
        </NextLink>{" "}
      </Stack>
    </Stack>
  );
};
