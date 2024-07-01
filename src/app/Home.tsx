import React from "react";
import { Text, View, Image } from "react-native";
import { Button } from "../components/Button";
import Logo from "../../assets/logo.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";


type Props = NativeStackScreenProps<RootStackParamList, "Home">;


export default function Home({ navigation, route }: Props) {
  return (
    <View className="flex-1 p-10 bg-white justify-center items-center gap-y-20">
      <View className="items-center gap-y-4">
        <Logo width={120} height={120} />
        <Text className="font-bold text-6xl text-primary w-">PessoalFi</Text>
      </View>
      <View className="w-full items-center gap-3">
        <Button label="Entrar" variant="default" size="lg" className="w-3/5" onPress={() => navigation.navigate("Login")} />
        <Button
          label="Criar Nova Conta"
          variant="secondary"
          size="lg"
          className="w-3/5"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}
