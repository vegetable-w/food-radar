export const fetchChatResponse = async (userMessage) => {
  const response = await fetch(
    "https://food-radar-7e3d7a860165.herokuapp.com/api/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage }),
    }
  );

  if (!response.ok) {
    // 解析错误信息（如果服务器返回了 JSON 错误）
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch recommendation");
  }

  return await response.json();
};

export const fetchRandomRecommendation = async () => {
  const response = await fetch(
    "https://food-radar-7e3d7a860165.herokuapp.com/api/random",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch recommendation");
  }

  return await response.json();
};

export const fetchLocationAndSend = async (setMessages) => {
  if (!navigator.geolocation) {
    setMessages((prev) => [
      ...prev,
      {
        text: "このブラウザは位置情報の取得をサポートしていません。",
        sender: "Bot",
      },
    ]);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const data = { latitude, longitude };

      try {
        const response = await fetch(
          "https://food-radar-7e3d7a860165.herokuapp.com/api/location",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            text: "現在の位置GET",
            sender: "Bot",
          },
        ]);
      } catch (error) {
        console.error("Error sending location:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "位置情報の送信中にエラーが発生しました。もう一度お試しください。",
            sender: "Bot",
          },
        ]);
      }
    },
    (error) => {
      console.error("Error getting location:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          text: "位置情報を取得できませんでした。権限を確認してください。",
          sender: "Bot",
        },
      ]);
    }
  );
};
