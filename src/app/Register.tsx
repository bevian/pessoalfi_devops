import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import axios from "axios";
import { set, z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "O email deve ser válido." }),
  tel: z.string().min(1, { message: "O telefone é obrigatório." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation, route }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setModalVisible(true);

    try {
      RegisterSchema.parse({
        name: name,
        email: email,
        tel: tel,
        password: password,
      });

      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem.");
      }

      await axios.post("https://backend-pessoalfi.vercel.app/api/register", {
        name: name,
        email: email,
        tel: tel,
        password: password,
      });
      setLoading(false);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error.message || "Erro ao se cadastrar.");
        console.log("Erro ao se cadastrar:", error);
      }

      setModalVisible(false);
      setLoading(false);
      console.log("Erro ao se cadastrar:", error);
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
              Criar conta
            </Text>
          </View>
          <View className="flex-1 w-full bg-white rounded-t-[60px]">
            <View className="flex-1 w-full mt-8 items-center justify-center">
              <View className="w-4/5 gap-y-3">
                <Input
                  label="Nome completo"
                  placeholder="John Doe"
                  className="w-full"
                  onChangeText={setName}
                />
                <Input
                  label="Email"
                  placeholder="exemplo@examplo.com"
                  className="w-full"
                  onChangeText={setEmail}
                />
                <Input
                  label="Telefone"
                  placeholder="+ 123 456 789"
                  className="w-full"
                  onChangeText={setTel}
                />
                <Input
                  label="Senha"
                  placeholder="Ex: ********"
                  className="w-full"
                  secureTextEntry
                  onChangeText={setPassword}
                />
                <Input
                  label="Confirme a senha"
                  placeholder="Ex: ********"
                  className="w-full"
                  secureTextEntry
                  onChangeText={setConfirmPassword}
                />
              </View>
              {error && <Text className="text-red">{error}</Text>}
              <View className="flex-1 w-4/5 items-center justify-center gap-y-4">
                <Text className="text-sm text-center w-4/5">
                  Ao continuar, você concorda com os Termos de Uso e Política de
                  Privacidade.
                </Text>
                <Button
                  label="Registrar"
                  variant="default"
                  size="lg"
                  className="w-3/5"
                  onPress={handleRegister}
                />
                <Text
                  className="text-sm text-center"
                  onPress={() => navigation.navigate("Login")}
                >
                  Já tem uma conta? Entrar
                </Text>
              </View>
            </View>
          </View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            {loading ? (
              <View className="flex-1 p-10 items-center justify-center opacity bg-black/20 ">
                <View className="bg-white w-5/6 h-2/6 rounded-lg items-center justify-center p-10 gap-y-24">
                  <Text className="font-bold text-xl text-center">
                    Carregando...
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex-1 p-10 items-center justify-center opacity bg-black/20 ">
                <View className="bg-white w-5/6 h-2/6 rounded-lg items-center p-10 gap-y-24">
                  <Text className="font-bold text-xl text-center">
                    Usuário criado com sucesso!
                  </Text>
                  <Button
                    label="Ir para o login"
                    variant="secondary"
                    onPress={() => navigation.navigate("Login")}
                    className="w-full h-16"
                  />
                </View>
              </View>
            )}
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
