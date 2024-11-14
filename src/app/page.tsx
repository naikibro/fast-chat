"use client";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const fetchMessages = async () => {
    const res = await fetch("/api/messages", { method: "GET" });
    const data = await res.json();
    setMessages(data);
  };

  const addMessage = async () => {
    if (!newMessage) return;
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newMessage }),
    });
    if (res.ok) {
      setNewMessage("");
      fetchMessages();
    }
  };

  const updateMessage = async (id: string, newText: string) => {
    const res = await fetch(`/api/messages`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: newText }),
    });
    if (res.ok) {
      fetchMessages();
      setCurrentlyEditing(null);
      setEditedText("");
    }
  };

  const deleteMessage = async (id: string) => {
    const res = await fetch(`/api/messages`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMessage();
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Fast Chat
      </Typography>

      {/* Display messages */}
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "65vh",
          marginBottom: 2,
        }}
      >
        {messages.map((message) => (
          <ListItem
            key={message.id}
            divider
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              my: 1,
            }}
          >
            {currentlyEditing === message.id ? (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <IconButton
                  color="primary"
                  onClick={() => updateMessage(message.id, editedText)}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => setCurrentlyEditing(null)}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <ListItemText
                primary={message.text}
                secondary={`Created at: ${new Date(
                  message.createdAt
                ).toLocaleString()}`}
                onClick={() => {
                  setCurrentlyEditing(message.id);
                  setEditedText(message.text);
                }}
              />
            )}
            <IconButton
              edge="end"
              color="secondary"
              onClick={() => deleteMessage(message.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Add new message */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          padding: 2,
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          position: "sticky",
          bottom: 0,
        }}
      >
        <TextField
          label="Enter your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={addMessage}
          disabled={!newMessage}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
