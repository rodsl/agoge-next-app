import {
  Button,
  Heading,
  HStack,
  Icon,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import _ from "lodash";

export const ContentHeader = ({
  heading,
  headingIcon,
  buttonLabel,
  buttonLeftIcon,
  onButtonClick,
}) => {
  const lightMode = useColorModeValue(true, false);

  return (
    <HStack
      shadow="md"
      px={4}
      py={2}
      minH={14}
      position="sticky"
      top={0}
      backdropFilter="blur(4px)"
      bg={lightMode ? "whiteAlpha.600" : "blackAlpha.300"}
      zIndex="banner"
    >
      {_.isFunction(headingIcon) && (
        <Icon
          as={headingIcon}
          bg="blue.600"
          color="gray.100"
          p={1.5}
          h={9}
          w={9}
          shadow="inner"
          rounded="xl"
        />
      )}
      <Heading size="md" color="blue.600">
        {heading}
      </Heading>
      <Spacer />
      {!_.isEmpty(buttonLabel) && (
        <Button
          leftIcon={buttonLeftIcon}
          colorScheme="blue"
          variant="ghost"
          _hover={{
            shadow: "inner",
          }}
          onClick={onButtonClick}
          rounded="xl"
        >
          {buttonLabel}
        </Button>
      )}
    </HStack>
  );
};
