import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";


import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Stack,
  Textarea,
  Text,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { sendPostDetails } from "../utills/api";

const CreatePost = () => {
  const [created, setCreated] = useState(false);

  var isLoggedIn = sessionStorage.getItem("LoginData");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      title: "",
      content: "",
    },
  });

  const sendPostDetailsMutation = useMutation( (data) => sendPostDetails(data))

  const onSubmit = (data) => {
    sendPostDetailsMutation.mutate(data, {
      onSuccess : () => {
        reset()
        setCreated(true);
      }
    })
    
  };

  return (
    <Flex justifyContent="center" alignItems="center" gap="10" h="70vh">
      <Box
        width={["100%", "80%", "70%", "70%", "50%"]}
        p={["5", "5", "10", "10", "10"]}
        height="fit-content"
        borderRadius="5"
      >
        {created ? (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            <AlertDescription pr="2">You Have </AlertDescription>
            <AlertTitle> Successfully</AlertTitle>
            Created Your New Post
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="20">
            <FormControl>
              <FormLabel color="gray.500">Your Name</FormLabel>
              <Input
                type="text"
                name="name"
                {...register("name", {
                  required: true,
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && <label>Name is required.</label>}
            </FormControl>

            <FormControl>
              <FormLabel color="gray.500">Post Title</FormLabel>
              <Input
                type="text"
                name="title"
                {...register("title", { required: true })}
                aira-invalid={errors.title ? "true" : "false"}
              />

              {errors.title && <label>Email is required.</label>}
            </FormControl>

            <FormControl>
              <FormLabel color="gray.500">Post Content</FormLabel>
              <Textarea
                type="text"
                name="content"
                {...register("content", { required: true, minLength: 5 })}
                aria-invalid={errors.content ? "true" : "false"}
              />

              {errors.content?.type === "required" && (
                <label>Message is required.</label>
              )}
            </FormControl>
            {isLoggedIn ? (<Flex gap="10">
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  w="20%"
                >
                  Publish
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  colorScheme="blue"
                  w="20%"
                >
                  Save as Draft
                </Button>
              </Flex>) : (
              <Flex gap="3" pt="5" justifyContent="center">
                <Text color="pink.500">
                  plz
                  <Link color="blue.500" px="1">
                    <NavLink to="/signin"> SignIn</NavLink>
                  </Link>
                  first to create a post
                </Text>
              </Flex>
            )}
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreatePost;