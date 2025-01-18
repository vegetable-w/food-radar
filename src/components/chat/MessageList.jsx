/* eslint-disable react/prop-types */
import React from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { HStack, Text, Box, Grid, Spinner } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import PlaceDrawer from "../drawer/PlaceDrawer";

function MessageList({
  messages,
  messageBg,
  selectedRestaurant,
  setSelectedRestaurant,
  handleRandomRecommendation,
  handleDrawerClose,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {messages.map((msg, index) => (
        <HStack
          key={index}
          justify={msg.sender === "user" ? "flex-end" : "flex-start"}
        >
          {msg.sender === "Bot" && (
            <Avatar size="md" src="/hamburger.png" bg="#fffae0" />
          )}
          <Box
            bg={
              msg.type === "places"
                ? "#fffae0"
                : msg.sender === "user"
                ? messageBg
                : "#ffeb66"
            }
            color={msg.sender === "user" ? "white" : "#314202"}
            px={4}
            py={2}
            borderRadius="lg"
            maxW="70%"
          >
            {msg.type === "spinner" ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Spinner />
              </Box>
            ) : msg.type === "places" ? (
              <Grid
                templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                gap={4}
              >
                {msg.data.map((place) => (
                  <Box
                    key={place.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    cursor="pointer"
                    bg="#FCFCFC"
                    position="relative"
                    width="300px"
                    height="235px"
                  >
                    <Box p={4}>
                      <Text fontWeight="bold" fontSize="lg" mb={2}>
                        {place.displayName.text}
                      </Text>
                      <Text mb={2}>{place.rating}⭐</Text>
                      <Text fontSize="sm" color="#93a362">
                        {place.editorialSummary.text}
                      </Text>
                    </Box>
                    <PlaceDrawer
                      selectedRestaurant={selectedRestaurant}
                      setSelectedRestaurant={setSelectedRestaurant}
                      handleDrawerClose={handleDrawerClose}
                      place={place}
                    />
                  </Box>
                ))}
              </Grid>
            ) : msg.type === "greeting" ? (
              <Box>
                <Text>{msg.text}</Text>
                <Button
                  mt={2}
                  size="sm"
                  color="#FFFFFF"
                  bg="#F09319"
                  _hover={{ bg: "#efa948" }}
                  onClick={handleRandomRecommendation}
                >
                  Quick Suggestion
                </Button>
              </Box>
            ) : (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            )}
          </Box>
        </HStack>
      ))}
    </div>
  );
}

export default MessageList;
