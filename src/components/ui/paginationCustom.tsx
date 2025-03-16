import { HStack } from "@chakra-ui/react";
import {
  PaginationRoot,
  PaginationPrevTrigger,
  PaginationItems,
  PaginationNextTrigger,
} from "./pagination";

export function Pagination() {
  return (
    <>
      <PaginationRoot
        count={20}
        pageSize={2}
        defaultPage={1}
        marginTop={"1rem"}
        marginLeft={"2rem"}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </>
  );
}
