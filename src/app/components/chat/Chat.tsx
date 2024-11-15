import {
  List,
  ListItem,
  Box,
  TextField,
  IconButton,
  ListItemText,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Message } from "@/app/models/Message";
import React from "react";

interface ChatProps {
  messages: Message[];
  currentlyEditing: string | null;
  editedText: string;
  onEditChange: (text: string) => void;
  onEditStart: (id: string, text: string) => void;
  onEditCancel: () => void;
  onEditSave: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  sx?: object;
}

const Chat = ({
  messages,
  currentlyEditing,
  editedText,
  onEditChange,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  sx,
}: ChatProps) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflowY: "auto",
        flexGrow: 1,
        maxHeight: "65vh",
        marginBottom: 2,
        ...sx,
      }}
    >
      {messages.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <em>No messages to display.</em>
        </Box>
      ) : (
        messages.map((message) => (
          <ListItem key={message.id} divider>
            {currentlyEditing === message.id ? (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  fullWidth
                  value={editedText}
                  onChange={(e) => onEditChange(e.target.value)}
                />
                <IconButton
                  onClick={() => onEditSave(message.id, editedText)}
                  aria-label="Save message"
                >
                  <SaveIcon />
                </IconButton>

                <IconButton onClick={onEditCancel} aria-label="Cancel editing">
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <ListItemText
                primary={message.text}
                secondary={`Created at: ${new Date(
                  message.createdAt
                ).toLocaleString()}`}
                onClick={() => onEditStart(message.id, message.text)}
              />
            )}
            <IconButton
              onClick={() => onDelete(message.id)}
              aria-label="Delete message"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default React.memo(Chat);
