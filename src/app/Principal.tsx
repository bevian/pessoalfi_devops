import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/Button";
import RNPickerSelect from "react-native-picker-select";
import { Input } from "../components/Input";

type Props = NativeStackScreenProps<RootStackParamList, "Principal">;

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
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    valor: "",
    categoria: "transporte",
    tipo: "gasto",
  });

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://backend-pessoalfi.vercel.app/api/transacao",
        {
          params: {
            user: user?.record_id,
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

  const addTransaction = async () => {
    try {
      const response = await axios.post(
        "https://backend-pessoalfi.vercel.app/api/transacao",
        {
          user: user?.record_id,
          valor: parseFloat(newTransaction.valor),
          categoria: newTransaction.tipo === "gasto" ? newTransaction.categoria : "entrada",
          tipo: newTransaction.tipo,
        }
      );
      await fetchTransactions();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao adicionar transação");
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
          <View className="h-64 w-full p-10 gap-y-10">
            <View>
              <Text className="font-bold text-4xl text-primary-foreground">
                Olá, Bem-vindo
              </Text>
              <Text className="font-bold text-md text-primary-foreground">
                Bom dia, {user?.name}!
              </Text>
            </View>
            <View className="flex-row w-full justify-between">
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
            </View>
          </View>
          <View className="flex-1 w-full pt-14 bg-white rounded-t-[60px]">
            <View className="items-center">
              <Button
                label="Nova Transação"
                onPress={() => setModalVisible(true)}
                size={"lg"}
                className="w-3/5"
              />
            </View>
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
          activeTab="Principal"
          onTabPress={(tab: any) => navigation.navigate(tab)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 p-10 items-center justify-center opacity bg-black/20">
            <View className="w-11/12 bg-white rounded-lg p-10 gap-y-4">
              <Text className="font-bold text-xl">Nova Transação</Text>
              <Input
                placeholder="Valor"
                keyboardType="numeric"
                value={newTransaction.valor}
                onChangeText={(text) =>
                  setNewTransaction({ ...newTransaction, valor: text })
                }
              />
              <View className="gap-y-2 pb-6">
                <Text>Tipo</Text>
                <View className="flex-row gap-x-10">
                  <TouchableOpacity
                    className="flex-row items-center gap-x-1"
                    onPress={() =>
                      setNewTransaction({ ...newTransaction, tipo: "gasto" })
                    }
                  >
                    <Ionicons
                      name={
                        newTransaction.tipo === "gasto"
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={24}
                      color="black"
                    />
                    <Text>Gasto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row items-center gap-x-1"
                    onPress={() =>
                      setNewTransaction({ ...newTransaction, tipo: "entrada" })
                    }
                  >
                    <Ionicons
                      name={
                        newTransaction.tipo === "entrada"
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={24}
                      color="black"
                    />
                    <Text>Entrada</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {newTransaction.tipo === "gasto" ? (
                <View>
                  <Text>Categoria</Text>
                  <RNPickerSelect
                    placeholder={{
                      label: "Selecione uma categoria...",
                      value: null,
                    }}
                    value={newTransaction.categoria}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, categoria: value })
                    }
                    items={[
                      { label: "Transporte", value: "transporte" },
                      { label: "Alimentação", value: "alimentacao" },
                      { label: "Saúde", value: "saude" },
                      { label: "Lazer", value: "lazer" },
                      { label: "Outro", value: "outro" },
                      { label: "Entrada", value: "entrada" },
                    ]}
                    style={{
                      inputAndroid: {
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        padding: 10,
                      },
                    }}
                  />
                </View>
              ) : null}

              <Button label="Adicionar" onPress={addTransaction} />
              <Button
                label="Cancelar"
                variant={"secondary"}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
