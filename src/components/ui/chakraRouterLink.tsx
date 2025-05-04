import { NavLinkProps, NavLink } from "react-router-dom";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type ChakraRouterLinkProps = ChakraLinkProps & NavLinkProps;

export function ChakraRouterLink(props: ChakraRouterLinkProps) {
  return <ChakraLink as={NavLink} {...props} />;
}
