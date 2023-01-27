import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import {
  Box,
  Flex,
  Stack,
  FormControl,
  Input,
  Container,
  Button,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  FormLabel,
  Alert,
  AlertIcon,
  Text,
  Link
} from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
//import { useQuery } from "react-query";
//import { getuserDetails } from "../utills/api";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [getData, setGetData] = useState();

  const history = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const handleClick = () => {
    setShow(!show);
  };

  //const getUserDetailsQuery = useQuery('userDetails' , () => getuserDetails())

  const onSubmit = (data) => {
    const { username, password } = data;

    if (getData) {
      if (getData.username === username && getData.password === password) {
        sessionStorage.setItem("LoginData", JSON.stringify(data));
        history("/posts");

        <Alert status="success">
          <AlertIcon />
          You have successfully logged in  !!!!
        </Alert>;
      } else {
        alert("Invalid details");
      }
    } else {
      alert('No data in local storage')
    }
    reset();
  };

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("postData"));
    setGetData(getItems);
  }, []);

  return (
    <Container
      h="90vh"
      display="flex"
      flexDir="column"
      paddingTop="120px"
    >
      <Box padding="10">
        <Flex flexDir="column" align="center" justify="center" gap="20">
          <FormLabel>SIGN IN</FormLabel>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
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
            <Text color="pink">Don't have a Account </Text>
            <Link color="blue">
              <NavLink to="/signup"> SignUp</NavLink>
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
