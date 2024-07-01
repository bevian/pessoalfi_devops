import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

function calcularGastosEEntradas(registros: any) {
  let totalGastos = 0;
  let totalEntradas = 0;

  registros.forEach((registro: any) => {
    if (registro.fields.tipo === "gasto") {
      totalGastos += registro.fields.valor;
    } else if (registro.fields.tipo === "entrada") {
      totalEntradas += registro.fields.valor;
    }
  });

  return {
    totalGastos,
    totalEntradas,
  };
}

const formatarData = (data: string) => {
  const date = new Date(data);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default function Login({ navigation, route }: Props) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([] as any);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://backend-pessoalfi.vercel.app/api/transacao",
        {
          params: {
            user: user?.record_id,
            categoria: route.params.categoria,
          },
        }
      );
      const data = response.data.data.records;
      setTransactions(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao buscar transações");
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    fetchTransactions();
  }, [user]);

  const renderTransactions = ({ item }: any) => {
    return (
      <View className="flex-row w-full justify-between py-4">
        <View className="flex-row gap-x-4 items-center">
          <Ionicons name="wallet" size={24} />
          <View>
            <Text className="font-bold text-xl">
              {item.fields.categoria.charAt(0).toUpperCase() +
                item.fields.categoria.slice(1)}
            </Text>
            <Text className="text-blue">
              {formatarData(item.fields.create)}
            </Text>
          </View>
        </View>
        <View className="items-center justify-center">
          <Text
            className={
              item.fields.tipo === "gasto"
                ? `text-blue font-bold text-xl`
                : `text-black font-bold text-xl`
            }
          >
            {item.fields.tipo === "gasto"
              ? `- ${item.fields.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`
              : ` ${item.fields.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <View className="flex-1 bg-primary justify-start items-center">
          <View className="h-64 w-full items-center p-10 gap-y-10">
            <View>
              <Text className="font-bold mt-8 text-3xl text-primary-foreground">
                Categoria:{" "}
                {route.params.categoria.charAt(0).toUpperCase() +
                  route.params.categoria.slice(1)}
              </Text>
            </View>
            {route.params.categoria === "entrada" ? (
              <View>
                <Text>Entradas</Text>
                <Text className="text-white font-bold text-3xl">
                  {calcularGastosEEntradas(
                    transactions
                  ).totalEntradas.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>
            ) : (
              <View>
                <Text>Gastos</Text>
                <Text className="font-bold text-3xl text-blue ">
                  -{" "}
                  {calcularGastosEEntradas(
                    transactions
                  ).totalGastos.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-1 w-full pt-14 bg-white rounded-t-[60px]">
            <View className="flex-1 w-full items-center justify-center">
              {transactions.length > 0 ? (
                <View className="flex-1 w-4/5 gap-y-6">
                  <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTransactions}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              ) : (
                <Text>Nenhuma transação encontrada</Text>
              )}
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
