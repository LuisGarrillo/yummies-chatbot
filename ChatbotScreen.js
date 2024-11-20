import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Este es un mensaje generado automáticamente por el bot." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Enviar mensaje al backend Flask
    try {
      const response = await axios.post("http://127.0.0.1:5000/chatbot", {
        input: input,
      });
      const botResponse = {
        type: "bot",
        text: response.data.bot_response,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Error al conectar con el servidor." },
      ]);
    }

    setInput("");
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === "bot" ? styles.botMessage : styles.userMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yummies Chatbot</Text>
      </View>

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Barra de entrada de texto */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe un mensaje..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  chatContainer: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#ff8c42",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#ff8c42",
    padding: 12,
    borderRadius: 20,
  },
});
