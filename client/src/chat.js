import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./style.css";

const Chat = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room: room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log(data);
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Flex flexDir="column" align="center" p="2" m="2">
      <Flex m="2">
        <Text color="white">Live Chat</Text>
      </Flex>
      <Flex
        w="350px"
        bgColor="gray.700"
        border="1px solid #263238"
        borderRadius="md"
        h="420px"
        px="5"
        m="2"
      >
        <ScrollToBottom className="msg-container">
          {msgList.map((msgContent) => {
            return (
              <Flex
                maxW="auto"
                align={
                  username === msgContent.author ? "flex-end" : "flex-start"
                }
                flexDir="column"
              >
                <Flex
                  w="9rem"
                  flexDir="column"
                  bgColor={
                    username === msgContent.author ? "#43a047" : "#37B0DB"
                  }
                  px="1"
                  mt="3"
                  borderRadius="sm"
                >
                  <Text color="white" fontSize="md">
                    {msgContent.message}
                  </Text>

                  <Flex justifyContent="flex-end">
                    <Text fontSize="10px" color="gray.300"> 
                      {msgContent.time}
                    </Text>
                    <Text ml="3" fontSize="10px" color="gray.100">
                      {msgContent.author}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </ScrollToBottom>
      </Flex>
      <Flex m="2">
        <Input
          m="1"
          type="text"
          value={currentMsg}
          onChange={(e) => {
            setCurrentMsg(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMsg();
          }}
          placeholder="type your message here..."
        />
        <Button m="1" onClick={sendMsg}>
          &#9658;
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
