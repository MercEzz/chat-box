import { useState } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import io from "socket.io-client";
import Chat from "./chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justifyContent="center"
      bgColor="gray.900"
    >
      {!showChat ? (
        <Flex
          flexDir="column"
          p="2"
          m="10"
          align="center"
          justifyContent="center"
        >
          <Heading m="10">Join a Chat</Heading>
          <Input
            w="lg"
            m="2"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="your name"
          />
          <Input
            w="lg"
            m="2"
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            placeholder="Room Id.."
          />
          <Button m="2" onClick={joinRoom}>
            Join
          </Button>
        </Flex>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Flex>
  );
}

export default App;
