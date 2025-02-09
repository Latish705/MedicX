import app from "./app";
import connectDb from "./utils/db";

<<<<<<< HEAD
const PORT = process.env.PORT || 8000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> 808ca0c42e893979f7cc0c0a7c6ab6144c77f7f1
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}  url: http://localhost:${PORT}`
    );
  });
});
