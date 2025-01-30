const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.POR || 3000;

require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-app-frontend-chi-one.vercel.app'],
    credentials: true,
}));

const bookRoutes = require("./src/books/books.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const AdminRoutes = require("./src/stats/admin.stats")

app.use("/api/books",bookRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", AdminRoutes);


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/',(req,res)=>{
        res.send('Hello World');
    })
}
main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

// password: book@123
// username: adithyarajvp