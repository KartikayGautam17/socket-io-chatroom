import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
function App() {
  const url: string | undefined = import.meta.env.VITE_SERVER_URL;
  const [message, setMessage] = useState("");

  const socket = useMemo(() => {
    return io(url);
  }, []);
  const HandleSendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/get", {}).then((val) => {
      console.log(val.data);
    });

    socket?.on("welcome", (data) => {
      console.log(data);
    });
    socket?.on("message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        id="outlined-basic"
        label="Message"
        variant="outlined"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        placeholder="..."
      />
      <Button
        onClick={HandleSendMessage}
        variant="contained"
        style={{ display: "block", marginTop: "10px" }}
      >
        Send
      </Button>
    </div>
  );
}

export default App;
