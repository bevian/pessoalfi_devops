import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { Button } from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Login({ navigation, route }: Props) {
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <View className="flex-1 bg-primary justify-start items-center">
          <View className="h-64 w-full p-10 gap-y-10 justify-center items-center">
            <Text className="font-bold text-4xl text-primary-foreground">
              Perfil
            </Text>
          </View>
          <View className="flex-1 w-full bg-white rounded-t-[60px]">
            <View className="flex-1 w-full mt-14 items-center gap-y-5">
              <View>
                <Text className="text-3xl font-bold">{user?.name}</Text>
                <Text className="text-lg">
                  id: {user?.record_id.replace("rec", "")}
                </Text>
              </View>
              <View className="w-4/5 mt-10 gap-6">
                <View className="gap-2">
                  <Text className="text-lg font-bold">Nome Do Usuário</Text>
                  <Text className="text-xl">{user?.name}</Text>
                </View>
                <View className="gap-2">
                  <Text className="text-lg font-bold">Telefone</Text>
                  <Text className="text-xl">{user?.tel}</Text>
                </View>
                <View className="gap-2">
                  <Text className="text-lg font-bold">E-mail</Text>
                  <Text className="text-xl">{user?.email}</Text>
                </View>
              </View>
              <Button
                label="Logout"
                variant={"secondary"}
                size={"lg"}
                onPress={() => handleLogout()}
              />
            </View>
          </View>
        </View>
        <Footer
          activeTab="Profile"
          onTabPress={(tab: any) => navigation.navigate(tab)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
