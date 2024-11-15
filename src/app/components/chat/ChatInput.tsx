import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  newMessage: string;
  onMessageChange: (text: string) => void;
  onMessageSend: () => void;
}

const ChatInput = ({
  newMessage,
  onMessageChange,
  onMessageSend,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onMessageSend();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        value={newMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ mr: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={onMessageSend}
        disabled={!newMessage}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
