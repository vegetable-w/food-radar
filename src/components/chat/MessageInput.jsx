/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "../ui/button";
import { HStack, Input } from "@chakra-ui/react";

function MessageInput({ input, setInput, handleSend }) {
  return (
    <HStack p={4} bg="#fffae0" borderTop="1px solid #fffae0">
      <Input
        bg="#FFFFFF"
        borderColor="#3D5300"
        focusBorderColor="#497000"
        color="#3D5300"
        flex="1"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <Button
        bg="#3D5300"
        color="#FFFFFF"
        _hover={{ bg: "#ABBA7C" }}
        onClick={handleSend}
      >
        Send
      </Button>
    </HStack>
  );
}

export default MessageInput;
