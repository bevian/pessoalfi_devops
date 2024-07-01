import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FooterProps = {
  activeTab: "Principal" | "Categories" | "Profile";
  onTabPress: (tab: "Principal" | "Categories" | "Profile") => void;
};

export default function Footer({ activeTab, onTabPress }: FooterProps) {
  return (
    <View className="flex-row h-16">
      <TouchableOpacity
        onPress={() => onTabPress("Principal")}
        className={`flex-1 justify-center items-center ${
          activeTab === "Principal" ? "bg-primary" : ""
        }`}
      >
        <Ionicons
          name="home"
          size={24}
          className={
            activeTab === "Principal" ? "text-white" : "text-primary-foreground"
          }
        />
        <Text
          className={
            activeTab === "Principal" ? "text-white" : "text-primary-foreground"
          }
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabPress("Categories")}
        className={`flex-1 justify-center items-center ${
          activeTab === "Categories" ? "bg-primary" : ""
        }`}
      >
        <Ionicons
          name="grid"
          size={24}
          className={
            activeTab === "Categories" ? "text-white" : "text-primary-foreground"
          }
        />
        <Text
          className={
            activeTab === "Categories" ? "text-white" : "text-primary-foreground"
          }
        >
          Categorias
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onTabPress("Profile")}
        className={`flex-1 justify-center items-center ${
          activeTab === "Profile" ? "bg-primary" : ""
        }`}
      >
        <Ionicons
          name="person"
          size={24}
          className={
            activeTab === "Profile" ? "text-white" : "text-primary-foreground"
          }
        />
        <Text
          className={
            activeTab === "Profile" ? "text-white" : "text-primary-foreground"
          }
        >
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
