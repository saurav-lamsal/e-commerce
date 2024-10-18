import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";

function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("Form Data:", values);
    try {
      const response = await axios.post("https://reqres.in/api/login", values);
      console.log("Response:", response.data.token);

      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
        setIsAuth(!isAuth);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("setIsAuth", true);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required fields";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required fields";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="LoginForm">
          <Text color={"blue"} fontSize={"2xl"} borderBottom={"2px"}>
            Login Page Here
          </Text>
          <br />
          <FormControl isRequired>
            <FormLabel htmlFor="email">Use Reqres Email</FormLabel>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="eve.holt@reqres.in"
              as={Input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <br />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              as={Input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
            <br />
            <Button
              mt={8}
              w={"100%"}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
