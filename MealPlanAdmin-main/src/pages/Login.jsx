import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  createStyles,
  Divider,
  Flex,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import LoginImg from "../assets/imgs/login.jpeg";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import IconFb from "../assets/icons/IconFb";
import IconGoogle from "../assets/icons/IconGoogle";

import { useDispatch, useSelector } from "react-redux";
import {
  requestSignIn,
  selectIsLogin,
  selectResponseUser,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { classes } = makeStyles();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoginUser = useSelector(selectIsLogin);
  const reponseUser = useSelector(selectResponseUser);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  function handleSignIn(values) {
    setSubmit(true);
    dispatch(requestSignIn({ email: values.email, password: values.password }));
  }

  useEffect(() => {
    if (submit && !reponseUser.loading) {
      toast(reponseUser.message);
    }
  }, [reponseUser.loading]);

  useEffect(() => {
    if (isLoginUser) {
      navigate("/");
    }
  }, [isLoginUser]);

  return (
    <Container className={classes.container}>
      <Flex className={classes.flex}>
        <Box className={classes.box}>
          <Image src={LoginImg} />
        </Box>

        <Box className={classes.boxFlex}>
          <form
            onSubmit={form.onSubmit((values) => {
              handleSignIn(values);
            })}
          >
            <Stack>
              <Text className={classes.title}>Login</Text>
              <TextInput
                placeholder="Your email"
                type="email"
                label="Email"
                classNames={{ input: classes.inputEmail }}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                placeholder="Password"
                label="Password"
                classNames={{ input: classes.inputPassword }}
                {...form.getInputProps("password")}
              />

              <Button type="submit" className={classes.button}>
                Login
              </Button>
            </Stack>
          </form>

          <Divider my={50} />

          <Stack spacing={10}>
            <Button
              leftIcon={<IconFb />}
              className={classes.button}
              color="indigo"
            >
              Login With Facebook
            </Button>

            <Button
              color="red"
              leftIcon={<IconGoogle />}
              className={classes.button}
            >
              Login With Google
            </Button>
          </Stack>

          <Text>Forgot your password?</Text>
        </Box>
      </Flex>
    </Container>
  );
};

const makeStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    padding: "20px 0",
  },
  box: {
    flex: 1,
  },

  boxFlex: {
    flex: 1,
    padding: "80px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  flex: {
    height: "100%",
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)",
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    overflow: "hidden",

    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  inputEmail: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  inputPassword: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  button: {
    minHeight: 40,
    borderRadius: 50,
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)",
  },
}));

export default Login;
