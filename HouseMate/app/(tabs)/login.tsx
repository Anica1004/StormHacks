import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "../../context/userContext";
import { useFocusEffect } from "@react-navigation/native";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const { initUser } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      initUser(user.uid);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleLogin = () => {
    console.log("Attempting to log in with email:", email); // Log the email being used
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        initUser(user.uid);
        console.log("Login successful for user:", user.email); // Log successful login
        alert(user.email + "succesfully logged in")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login failed:", errorCode, errorMessage); // Log error details
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={[styles.title, { fontFamily: "Montserrat-Black" }]}>
          Login
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    fontFamily: "Montserrat-Black",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    alignItems: "center",
  },
  title: {
    marginTop: 30,
    padding: 20,
    fontSize: 30,
    color: "#333",
    marginBottom: 30,
    fontFamily: "Montserrat-Black",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6DC916",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  createAccountButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "center",
    borderColor: "#6DC916",
    borderWidth: 1,
  },
  createAccountText: {
    color: "#6DC916",
    fontSize: 16,
    fontWeight: "600",
  },
});
