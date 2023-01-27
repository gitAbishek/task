import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import React from "react";

import { FaMoon, FaSun } from "react-icons/fa";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useNavigate();

  var isLoggedIn = sessionStorage.getItem("LoginData");

  const handleClick = () => {
    sessionStorage.clear();
    history("/signin");
  };

  return (
    <Box
      h="10vh"
      p="5"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="10"
    >
      <Stack>
        <Text>Blog's</Text>
      </Stack>

      <Flex gap="10" align="center">
        {isLoggedIn ? <NavLink to="/posts">POSTS</NavLink> : null}
        <NavLink to="/create-post">CREATE-POST</NavLink>
        {isLoggedIn ? null : <NavLink to="/signin">SIGN-IN</NavLink> }

        
        
        {isLoggedIn ? (
          <Button onClick={handleClick} colorScheme="blue">
            Sign Out
          </Button>
        ) : null}
      </Flex>

      <Stack>
        <IconButton
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound="true"
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
        />
      </Stack>
    </Box>
  );
};

export default Navbar;
