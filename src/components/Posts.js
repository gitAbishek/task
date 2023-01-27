import {
  Spinner,
  SimpleGrid,
  Stack,
  Heading,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";

import { useQuery } from "react-query";
import { getBlogPosts } from "../utills/api";

const Posts = () => {
  const getBlogPostQuery = useQuery("blogpost", () => getBlogPosts());

  if (getBlogPostQuery.isSuccess) {
    return (
      <Box display="flex" flexDir="column" w="100%" p={10} gap="10">
        <SimpleGrid columns={4} spacing={30} w="90%" margin="auto">
          {getBlogPostQuery.data?.map((post) => (
            <Stack
              direction="column"
              key={post.id}
              h="200"
            >
              <Heading>{post?.title?.rendered}</Heading>
            </Stack>
          ))}
        </SimpleGrid>
        <Flex justify="space-between" w="90%" margin="auto">
          <Button>Prev Page</Button>
          <Button>Next Page</Button>
        </Flex>
      </Box>
    );
  }

  return <Spinner />;
};

export default Posts;
