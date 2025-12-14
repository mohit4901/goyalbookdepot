import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// ✅ Secure & controlled CORS setup
app.use(cors({
  origin: [
    'https://matify-frontend.vercel.app',
    'http://localhost:5173',
     'http://localhost:5174',
      'http://localhost:5175',
    'http://localhost:3000',
    'https://gbd-admin.vercel.app',
  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

// Middlewares
app.use(express.json())

// API Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working perfectly✅")
})

app.listen(port, () => console.log('🚀 Server started on PORT : ' + port))



