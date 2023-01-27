import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import { registerUser } from "../utills/api";

import {
  Box,
  Flex,
  FormLabel,
  Stack,
  FormControl,
  Input,
  Container,
  Button,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Text,
  Link
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const history = useNavigate()
  

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = () => {
    setShow(!show);
  };

  const registerUserMutation = useMutation((data) => registerUser(data));

  const onSubmit = (data) => {
    
    localStorage.setItem('postData', JSON.stringify(data));
    registerUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setSuccess(true);
      },
    });
    history('/signin')
  };
  

  return (
    <Container
      h="90vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignSelf="center"
    >
      <Box padding="10">
        <Flex flexDir="column" align="center" gap="20">
          {success ? (
            <Alert status="success">
              <AlertIcon />
              Your Account is Successfylly created. Enjoy !!!!
            </Alert>
          ) : null}

          <FormLabel>SIGN UP</FormLabel>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormControl isInvalid={errors.firstname}>
              <FormLabel>First Name</FormLabel>
              <Input
                id="firstname"
                type="text"
                {...register("first_name", {
                  required: "This field is required",
                })}
              />
              <FormErrorMessage color="lightblue">
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastname}>
              <FormLabel>Last Name</FormLabel>
              <Input
                id="lastname"
                type="text"
                {...register("last_name", {
                  required: "This field is required",
                })}
              />
              <FormErrorMessage color="lightblue">
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel>UserName</FormLabel>
              <Input
                id="username"
                type="text"
                {...register("username", {
                  required: "This field is required",
                })}
              />
              <FormErrorMessage color="lightblue">
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="text"
                {...register("email", { required: "This field is required" })}
              />
              <FormErrorMessage color="lightblue">
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                <InputRightElement>
                  <BiShow color="pink" cursor="pointer" onClick={handleClick} />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage color="lightblue">
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit">Submit</Button>
          </Stack>
          <Flex gap="3" pt="5" justifyContent="center">
            <Text color="pink">Already have an Account </Text>
            <Link color="blue">
              <NavLink to="/signin"> SignIn</NavLink>
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
