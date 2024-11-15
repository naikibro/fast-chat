import { SignInButton } from "@clerk/nextjs";
import { Box, Card, Typography, Button, Container } from "@mui/material";

const Auth = () => {
  const bgImageUrl =
    "https://fastchatstorage.blob.core.windows.net/files/bg.jpg";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: 4,
            borderRadius: 6,
          }}
        >
          <Typography variant="h2" align="center">
            Please log in to access Fast Chat.
          </Typography>
          <SignInButton mode="modal">
            <Button variant="outlined">LOGIN</Button>
          </SignInButton>
        </Card>
      </Container>
    </Box>
  );
};

export default Auth;
