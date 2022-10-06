import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  chakra,
  CloseButton,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Slide,
  Spacer,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";
import { apiService } from "services";

import _ from "lodash";
import { FiEdit, FiFilePlus, FiPlus } from "react-icons/fi";
import { ContentHeader, Overlay } from "components";
import { useCustomForm } from "hooks";
import { FormMaker } from "components/Forms";

export default function Cadastros() {
  const { data: session } = useSession();
  const lightMode = useColorModeValue(true, false);
  const novaTabelaForm = useCustomForm();
  const novaTabelaFormInputs = [
    {
      id: "nomeTabela",
      label: "Nome",
      formControl: novaTabelaForm.control,
      required: "Obrigatório",
    },
    {
      id: "descricaoTabela",
      label: "Descrição",
      formControl: novaTabelaForm.control,
      type: "textarea",
    },
  ];

  const fetchTables = async () => {
    if (_.isObject(session)) {
      try {
        const { data: response } = await apiService.get(`/${session.id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const submitForm = async (formData, e) => {
    console.log(formData, e);
    try {
      const { data: response } = await apiService.post(
        `${session.id}/tables`,
        formData
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [session]);

  return (
    <>
      <ContentHeader
        heading="Cadastros"
        headingIcon={FiFilePlus}
        buttonLabel="Nova Tabela"
        buttonLeftIcon={<FiPlus />}
        onButtonClick={novaTabelaForm.openOverlay}
      />
      <TableContainer p={4} h="100vh">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Tabela</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>tabela 1</Td>
              <Td isNumeric>
                <IconButton
                  icon={<FiEdit />}
                  variant="ghost"
                  colorScheme="blue"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>tabela 2</Td>
              <Td isNumeric>
                {" "}
                <IconButton
                  icon={<FiEdit />}
                  variant="ghost"
                  colorScheme="blue"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>tabela 3</Td>
              <Td isNumeric>
                {" "}
                <IconButton
                  icon={<FiEdit />}
                  variant="ghost"
                  colorScheme="blue"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {/* <Drawer
        isOpen={novaTabelaForm.overlayIsOpen}
        placement="top"
        onClose={novaTabelaForm.closeOverlay}
      >
        <DrawerOverlay />
        <DrawerContent maxH="80vh" roundedBottom="2xl" bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <Box p={30} h="100">
              Section
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={novaTabelaForm.closeOverlay}
            >
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}

      <Overlay
        isOpen={novaTabelaForm.overlayIsOpen}
        placement={useBreakpointValue({ base: "top", sm: "right" })}
        onClose={novaTabelaForm.closeOverlay}
        onCloseComplete={novaTabelaForm.control.reset}
        roundedBottom="2xl"
        closeButton
        bg={lightMode ? "gray.100" : "gray.800"}
        size="sm"
      >
        <Heading size="lg" color={lightMode ? "gray.700" : "gray.400"}>
          Nova Tabela
        </Heading>
        <FormMaker>{novaTabelaFormInputs}</FormMaker>
        <HStack>
          <Button
            variant="ghost"
            colorScheme="blue"
            _hover={{
              shadow: "inner",
            }}
            onClick={novaTabelaForm.closeOverlay}
          >
            Cancelar
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            _hover={{
              shadow: "inner",
            }}
            onClick={novaTabelaForm.handleSubmit(submitForm)}
            isDisabled={!novaTabelaForm.validation}
            isLoading={novaTabelaForm.isLoading}
            loadingText="Aguarde"
            spinner={<Spinner size="sm" />}
          >
            Salvar
          </Button>
        </HStack>
      </Overlay>
    </>
  );
}

Cadastros.auth = true;
Cadastros.dashboard = true;
