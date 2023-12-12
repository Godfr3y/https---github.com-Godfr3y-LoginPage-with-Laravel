import { View, ToastAndroid, ImageBackground } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import Services from "../services/Services";

export default function RegisterForm({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showRePass, setShowRePass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const showToast = (message = "Something went wrong") => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      if (name === "" || email === "" || password === "" || repassword === "") {
        showToast("Input required data");
        setIsError(true);
        return false;
      }

      if (password !== repassword) {
        showToast("Match the password");
        setIsError(true);
        return false;
      }

      const url = "http://192.168.254.108/api/v1/register";
      const data = {
        name,
        email,
        password,
        password_confirmation: repassword,
      };

      const result = await Services.postData(url, data);

      if (result?.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Login");
      }
    } catch (e) {
      showToast(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('./image/ace.jpg')}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Text variant="displayMedium">Register</Text>
        <TextInput
          mode="outlined"
          placeholder="Name"
          label="Name"
          style={{ marginTop: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}
          value={name}
          onChangeText={setName}
          error={isError}
        />
        <TextInput
          mode="outlined"
          placeholder="Email"
          label="Email"
          style={{ marginTop: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}
          value={email}
          onChangeText={setEmail}
          error={isError}
        />
        <TextInput
          mode="outlined"
          placeholder="Password"
          label="Password"
          secureTextEntry={!showPass}
          right={
            <TextInput.Icon
              icon={showPass ? "eye" : "eye-off"}
              onPress={() => setShowPass(!showPass)}
            />
          }
          style={{ marginTop: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}
          value={password}
          onChangeText={setPassword}
          error={isError}
        />
        <TextInput
          mode="outlined"
          placeholder="Re-type Password"
          label="Re-type Password"
          secureTextEntry={!showRePass}
          right={
            <TextInput.Icon
              icon={showPass ? "eye" : "eye-off"}
              onPress={() => setShowRePass(!showRePass)}
            />
          }
          style={{ marginTop: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}
          value={repassword}
          onChangeText={setRepassword}
          error={isError}
        />
        <Button
          disabled={loading}
          loading={loading}
          icon="account-plus"
          mode="contained"
          style={{ marginTop: 10, backgroundColor: '#f29c46' }}
          onPress={handleRegistration}
        >
          Register
        </Button>
        <Button
          disabled={loading}
          onPress={() => navigation.pop()}
          icon="arrow-left"
          mode="contained"
          style={{ marginTop: 10, backgroundColor: '#f29c46' }}
        >
          Go Back
        </Button>
      </View>
    </ImageBackground>
  );
}
