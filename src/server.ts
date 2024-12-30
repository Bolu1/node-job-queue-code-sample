import app from "./app";

const PORT = process.env.PORT || 9000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
