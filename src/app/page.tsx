"use client";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Chat from "./components/chat/Chat";
import ChatInput from "./components/chat/ChatInput";
import { Message } from "./models/Message";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [pollingInterval, setPollingInterval] = useState(5000);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  const addMessage = async () => {
    if (!newMessage) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newMessage }),
    });
    setNewMessage("");
    fetchMessages();
  };

  const updateMessage = async (id: string) => {
    await fetch(`/api/messages`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: editedText }),
    });
    setCurrentlyEditing(null);
    setEditedText("");
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
  };

  const startEditing = (id: string, text: string) => {
    setCurrentlyEditing(id);
    setEditedText(text);
  };

  const cancelEditing = () => {
    setCurrentlyEditing(null);
    setEditedText("");
  };

  useEffect(() => {
    fetchMessages();

    // TODO : later, replace by Realtime Cosmosdb pubsub
    const interval = setInterval(fetchMessages, pollingInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Fast Chat
      </Typography>
      <Chat
        messages={messages}
        currentlyEditing={currentlyEditing}
        editedText={editedText}
        onEditChange={setEditedText}
        onEditStart={startEditing}
        onEditCancel={cancelEditing}
        onEditSave={updateMessage}
        onDelete={deleteMessage}
      />
      <ChatInput
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onMessageSend={addMessage}
      />
    </Container>
  );
}
