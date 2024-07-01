import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

type Props = NativeStackScreenProps<RootStackParamList, "Categories">;

const categorias = [
  { id: 1, nome: "transporte", label: "Transporte" },
  { id: 2, nome: "alimentacao", label: "Alimentação" },
  { id: 3, nome: "saude", label: "Saúde" },
  { id: 4, nome: "lazer", label: "Lazer" },
  { id: 5, nome: "outro", label: "Outro" },
  { id: 6, nome: "entrada", label: "Entradas" },
];

export default function Login({ navigation, route }: Props) {
  const { user } = useAuth();

  const navigateToCategory = (categoria: string) => {
    navigation.navigate("Category", { categoria });
  };

  const renderCategories = () => {
    return categorias.map((categoria) => (
      <TouchableOpacity
        key={categoria.id}
        onPress={() => navigateToCategory(categoria.nome)}
        className="bg-gray w-56 item-center justify-center p-4 rounded-full"
      >
        <Text className="text-center">{categoria.label}</Text>
      </TouchableOpacity>
    ));
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
              Categorias
            </Text>
          </View>
          <View className="flex-1 w-full bg-white rounded-t-[60px] items-center">
            <View className="flex-1 w-4/5 items-center justify-center gap-y-5">
              {renderCategories()}
            </View>
          </View>
        </View>
        <Footer
          activeTab="Categories"
          onTabPress={(tab: any) => navigation.navigate(tab)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
