import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { FiFilePlus, FiHome, FiLogOut, FiSettings } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { apiService } from "services";

import _ from "lodash";

export const Navbar = () => {
  const { data: session } = useSession();
  const [loadingSignOut, setLoadingSignOut] = useBoolean();

  const signOutSession = () => {
    setLoadingSignOut.on();
    return signOut();
  };

  return (
    <HStack
      h="60px"
      position="sticky"
      top={0}
      zIndex="toast"
      bg="gray.100"
      px={4}
      justifyContent="space-between"
    >
      <Heading size="md">Agoge</Heading>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link">
          <Avatar size="sm">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </MenuButton>
        <MenuList p={0}>
          <MenuGroup title={`Olá, ${_.startCase(session?.user?.name)}`}>
            <MenuItem rounded="xl" icon={<FiSettings />}>
              Configurações
            </MenuItem>
            <MenuItem
              rounded="xl"
              onClick={signOutSession}
              icon={
                loadingSignOut ? <Icon as={Spinner} mt={1} /> : <FiLogOut />
              }
              isDisabled={loadingSignOut}
              closeOnSelect={false}
            >
              {loadingSignOut ? "Saindo..." : "Sair"}
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export const Sidebar = () => {
  return (
    <Stack
      bg="gray.200"
      w="250px"
      h="calc(100vh - 60px)"
      overflowY="auto"
      position="sticky"
      top={0}
      p={4}
    >
      <NextLink href="/" passHref>
        <Link
          as={HStack}
          p={3}
          rounded="xl"
          _hover={{
            bg: "gray.300",
          }}
        >
          <Icon as={FiHome} /> <Text>Home</Text>
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link
          as={HStack}
          p={3}
          rounded="xl"
          _hover={{
            bg: "gray.300",
          }}
        >
          <Icon as={FiFilePlus} /> <Text>Cadastro</Text>
        </Link>
      </NextLink>
    </Stack>
  );
};

export const Content = () => {
  return (
    <Box
      w="calc(100vw - 250px)"
      h="calc(100vh - 60px)"
      overflowY="auto"
      position="sticky"
      top={0}
      p={4}
    >
      Content
    </Box>
  );
};

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const fetchTables = async () => {
    if (session) {
      try {
        const { data: response } = await apiService.get(`/${session.id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTables();
  }, [session]);

  return (
    <>
      <Flex flexDir="column" alignItems="stretch" flex="1">
        <Navbar />
        <Flex h="full" flex="1" alignItems="stretch">
          <Sidebar />
          <Content />
        </Flex>
      </Flex>
    </>
  );
}

Home.auth = true;
