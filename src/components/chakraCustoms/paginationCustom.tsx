import { HStack } from "@chakra-ui/react";
import {
  PaginationRoot,
  PaginationPrevTrigger,
  PaginationItems,
  PaginationNextTrigger,
} from "../ui/pagination";

export type paginationProps = {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
};

export function Pagination({
  totalCount,
  itemsPerPage,
  currentPage,
}: paginationProps) {
  return (
    <>
      <PaginationRoot
        count={totalCount}
        pageSize={itemsPerPage}
        defaultPage={currentPage}
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
