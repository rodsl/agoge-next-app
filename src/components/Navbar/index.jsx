import {
  Avatar,
  AvatarBadge,
  Button,
  Heading,
  Hide,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
  Spinner,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut, FiMenu, FiSettings } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";

import _ from "lodash";

export const Navbar = ({ setSidebarToggle }) => {
  const { data: session } = useSession();
  const [loadingSignOut, setLoadingSignOut] = useBoolean();
  const showSidebarButton = useBreakpointValue(
    { base: false, sm: true },
    { ssr: false }
  );
  const lightMode = useColorModeValue(true, false);

  const signOutSession = () => {
    setLoadingSignOut.on();
    return signOut();
  };

  return (
    <HStack
      h="60px"
      position="sticky"
      top={0}
      zIndex="banner"
      bg={lightMode ? "gray.100" : "gray.800"}
      px={4}
      justifyContent="space-between"
    >
      <HStack spacing={{ base: 2, sm: 0 }}>
        <Hide above="sm">
          <IconButton
            icon={<FiMenu size="1.5rem" />}
            variant="ghost"
            onClick={setSidebarToggle.toggle}
          />
        </Hide>
        <Heading size="md">Agoge</Heading>
      </HStack>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="link">
          <Avatar size="sm">
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </MenuButton>
        <MenuList p={0} rounded="xl">
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
