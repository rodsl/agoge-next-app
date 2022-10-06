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

  return <>Home</>;
}

Home.auth = true;
Home.dashboard = true;
