import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation, route }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate("Principal");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 bg-primary justify-start items-center">
          <View className="items-center h-64 justify-center">
            <Text className="font-bold text-4xl text-primary-foreground">
              Bem-vindo
            </Text>
          </View>
          <View className="flex-1 w-full bg-white rounded-t-[60px]">
            <View className="flex-1 w-full mt-28 items-center justify-center">
              <View className="w-4/5 gap-y-6">
                <Input
                  label="Nome de usuário ou e-mail"
                  placeholder="exemplo@examplo.com"
                  className="w-full"
                  onChangeText={setEmail}
                />
                <Input
                  label="Senha"
                  placeholder="Ex: ********"
                  className="w-full"
                  secureTextEntry
                  onChangeText={setPassword}
                />
              </View>
              <View className="flex-1 w-4/5 mt-28 items-center gap-y-4">
                {loading ? 
                <Text>Carregando ...</Text>
                : (
                  <Button
                    label="Entrar"
                    variant="default"
                    size="lg"
                    className="w-3/5"
                    onPress={handleLogin}
                  />
                )}
                <Button
                  label="Registrar"
                  variant="secondary"
                  size="lg"
                  className="w-3/5"
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
