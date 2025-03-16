import { Link as RouterLink, LinkProps } from "react-router-dom";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type ChakraRouterLinkProps = ChakraLinkProps & LinkProps;

export function ChakraRouterLink(props: ChakraRouterLinkProps) {
  return <ChakraLink as={RouterLink} {...props} />;
}
