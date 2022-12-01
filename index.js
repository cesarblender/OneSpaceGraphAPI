import app from "./api";

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port", process.env.PORT)
})
