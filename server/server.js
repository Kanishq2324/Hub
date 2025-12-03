import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import  connectDB  from './configs/db.js';
import router from './routes/userRoutes.js';
import chatRouter from './routes/chatRoute.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';

const app = express();


// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Server is Live!'))
app.use("/api/user", router)
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);


const PORT = process.env.PORT || 3000


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: ${PORT}`);
        
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
    
})