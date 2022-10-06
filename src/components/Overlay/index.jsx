import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import _ from "lodash";

export function Overlay({
  closeButton = true,
  onCloseComplete,
  isOpen,
  onClose,
  size = "md",
  header = "Overlay Header",
  children,
  transition,
  placement,
  minH,
  ...props
}) {
  return (
    <>
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size={size}
        placement={placement}
        onCloseComplete={onCloseComplete}
      >
        <DrawerOverlay />
        <DrawerContent
          shadow="2xl"
          transition={transition}
          {...minH}
          {...props}
        >
          {closeButton && <DrawerCloseButton />}
          {_.isArray(children) ? (
            children.map((child, idx) => {
              switch (idx) {
                case 0:
                  return (
                    <DrawerHeader key={`DrawerHeader-${idx}`}>
                      {child}
                    </DrawerHeader>
                  );
                case 1:
                  return (
                    <DrawerBody key={`DrawerBody-${idx}`}>{child}</DrawerBody>
                  );
                case 2:
                  return (
                    <DrawerFooter key={`DrawerFooter-${idx}`}>
                      {child}
                    </DrawerFooter>
                  );

                default:
                  return <></>;
              }
            })
          ) : (
            <>
              <DrawerHeader shadow="md">{header}</DrawerHeader>
              <DrawerBody pt={6}>{children}</DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
