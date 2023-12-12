import { View, ToastAndroid, ImageBackground } from "react-native";
import React from "react";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import Services from "../services/Services";
import backgroundImage from "./image/ace.jpg";

export default function LoginForm({ navigation }) {
  const [showPass, setShowPass] = React.useState(false);

  const showToast = (message = "Something went wrong") => {
    ToastAndroid.show(message, 3000);
  };

  const handleLogin = async (values) => {
    try {
      const url = "http://192.168.254.108(/api/v1/login";
      const result = await Services.postData(url, values);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Home");
      }
    } catch (e) {
      console.debug(e.toString());
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Enter your email"),
    password: Yup.string().required("Enter your password"),
  });

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, justifyContent: "center" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setTouched,
        }) => {
          return (
            <View style={{ margin: 20 }}>
              <Text style={{ fontSize: 32, marginBottom: 20, color: "white", fontWeight: "bold", justifyContent: 'center', alignItems: 'center' }}>Welcome Back!</Text>
              <TextInput
                mode="outlined"
                placeholder="Email"
                label="Email"
                left={<TextInput.Icon icon="email" color="white" />}
                style={{ marginTop: 10, backgroundColor: "transparent" }}
                defaultValue={values.email}
                value={values.email}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email && touched.email}
                onFocus={() => setTouched({ email: true }, false)}
                theme={{ colors: { primary: "white", text: "white" } }}
              />
              {errors.email && touched.email && (
                <HelperText type="error" visible={errors.email}>
                  {errors.email}
                </HelperText>
              )}
              <TextInput
                mode="outlined"
                placeholder="Password"
                label="Password"
                left={<TextInput.Icon icon="lock" color="white" />}
                secureTextEntry={!showPass}
                right={
                  <TextInput.Icon
                    icon={showPass ? "eye" : "eye-off"}
                    color="white"
                    onPress={() => setShowPass(!showPass)}
                  />
                }
                style={{ marginTop: 10, backgroundColor: "transparent" }}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password && touched.password}
                onFocus={() => setTouched({ password: true }, false)}
                theme={{ colors: { primary: "white", text: "white" } }}
              />
              {errors.password && touched.password && (
                <HelperText type="error" visible={errors.password}>
                  {errors.password}
                </HelperText>
              )}
              <Button
                loading={isSubmitting}
                disabled={isSubmitting}
                onPress={handleSubmit}
                icon="login"
                mode="contained"
                style={{ marginTop: 20, backgroundColor: "#f29c46" }}
              >
                Login
              </Button>
              <Button
                disabled={isSubmitting}
                onPress={() => navigation.navigate("Register")}
                icon="account-plus"
                mode="contained"
                style={{ marginTop: 10, backgroundColor: "#f29c46" }}
              >
                Register
              </Button>
            </View>
          );
        }}
      </Formik>
    </ImageBackground>
  );
}
