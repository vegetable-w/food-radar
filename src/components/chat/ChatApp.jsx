/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useColorModeValue } from "../ui/color-mode";
import { HStack, VStack, Text, Flex } from "@chakra-ui/react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  fetchChatResponse,
  fetchRandomRecommendation,
  fetchLocationAndSend,
} from "../../utils/api";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const bg = useColorModeValue("gray.100", "gray.800");
  const messageBg = useColorModeValue("#ABBA7C", "#ABBA7C");

  useEffect(() => {
    setMessages([
      {
        text: "Hello! 🍽「Send Location」ボタンをクリックして、まず位置情報を共有してください。アプリの体験がここから始まります！",
        sender: "Bot",
        type: "greeting",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();

      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInput("");

      setMessages((prev) => [...prev, { type: "spinner", sender: "Bot" }]);

      try {
        const data = await fetchChatResponse(userMessage);

        if (data.response) {
          setMessages((prev) => prev.filter((msg) => msg.type !== "spinner"));

          simulateTypingEffect(data.response, "Bot", () => {
            if (data.placesData) {
              setMessages((prev) => [
                ...prev,
                { type: "places", data: data.placesData, sender: "Bot" },
              ]);
            }
          });
        }
      } catch (error) {
        console.error("Error calling API:", error);

        const errorMsg = error.message || "An unknown error occurred.";

        setMessages((prev) => [
          ...prev.filter((msg) => msg.type !== "spinner"),
          { text: `エラー: ${errorMsg}`, sender: "Bot" },
        ]);
      }
    }
  };

  const simulateTypingEffect = (text, sender, callback) => {
    let index = 0;

    // 添加一个占位符消息到消息列表
    setMessages((prev) => [...prev, { text: "", sender }]);

    const interval = setInterval(() => {
      setMessages((prev) => {
        // 确保只更新最后一条消息
        const updatedMessages = [...prev];
        const lastMessage = updatedMessages[updatedMessages.length - 1];

        // 确保是当前正在更新的消息
        if (lastMessage.sender === sender) {
          lastMessage.text = text.slice(0, index + 1); // 截取字符串到当前索引
        }

        return updatedMessages;
      });

      index++;

      // 停止逐字更新
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 50); // 每 50ms 更新一个字符
  };

  const handleRandomRecommendation = async () => {
    setMessages((prev) => [...prev, { type: "spinner", sender: "Bot" }]);

    try {
      const data = await fetchRandomRecommendation();

      if (data.response) {
        setMessages((prev) => prev.filter((msg) => msg.type !== "spinner"));

        simulateTypingEffect(data.response, "Bot", () => {
          if (data.placesData) {
            setMessages((prev) => [
              ...prev,
              { type: "places", data: data.placesData, sender: "Bot" },
            ]);
          }
        });
      }
    } catch (error) {
      console.error("Error calling API:", error);

      const errorMsg = error.message || "An unknown error occurred.";

      setMessages((prev) => [
        ...prev.filter((msg) => msg.type !== "spinner"),
        { text: `Sorry, something went wrong: ${errorMsg}`, sender: "Bot" },
      ]);
    }
  };

  const handleDrawerClose = () => {
    setSelectedRestaurant(null);
  };

  return (
    <Flex h="100vh" bg={bg} direction="column">
      {/* Header */}
      <HStack
        justify="space-between"
        align="center"
        p={4}
        bg="#3D5300"
        color="white"
        h="60px"
      >
        <Text fontSize="lg" fontWeight="bold">
          Food Radar 🍳
        </Text>

        <Button
          bg="#FFFFFF"
          color="#3D5300"
          _hover={{ bg: "#c2cba3" }}
          fontWeight="bold"
          zIndex="10"
          onClick={() => fetchLocationAndSend(setMessages)}
        >
          Send Location
        </Button>
      </HStack>

      <VStack
        flex="1"
        spacing={4}
        overflowY="auto"
        p={4}
        align="stretch"
        bg="#fffae0"
      >
        <MessageList
          messages={messages}
          messageBg={messageBg}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          handleRandomRecommendation={handleRandomRecommendation}
          handleDrawerClose={handleDrawerClose}
        />
      </VStack>

      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </Flex>
  );
}

export default ChatApp;
