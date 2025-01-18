/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "../ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Box, Grid, Text } from "@chakra-ui/react";

function PlaceDrawer({
  selectedRestaurant,
  setSelectedRestaurant,
  handleDrawerClose,
  place,
}) {
  return (
    <DrawerRoot
      isOpen={selectedRestaurant?.id === place.id}
      onClose={handleDrawerClose}
      size="md"
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          size="sm"
          bg="#3D5300"
          color="#FFFFFF"
          _hover={{ bg: "#ABBA7C" }}
          fontWeight="bold"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
          }}
          onClick={() => setSelectedRestaurant(place)}
        >
          詳細を見る
        </Button>
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerHeader>
          <DrawerTitle color="#263402">{place.displayName.text}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Text fontWeight="bold" color="#263402">
            Rating: {place.rating}⭐
          </Text>
          <Text fontWeight="bold" color="#263402">
            Address: {place.formattedAddress}
          </Text>
          <Text mt={4} color="#7e8d54">
            {place.editorialSummary.text}
          </Text>

          {/* 照片展示 */}
          <Box mt={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {place.photos?.slice(0, 4)?.map((photo, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="sm"
                >
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.name
                      .split("/")
                      .pop()}&key=AIzaSyDJZMuGBUCM8_sfOT3lRfKKvSWIEuX2lHc`}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button
              bg="#3D5300"
              color="#FFFFFF"
              _hover={{ bg: "#ABBA7C" }}
              fontWeight="bold"
              onClick={handleDrawerClose}
            >
              Close
            </Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}

export default PlaceDrawer;
