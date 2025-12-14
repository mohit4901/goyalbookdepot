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

const allowedOrigins = [
  'https://goyalbookdepot-frontend.vercel.app',
  'https://gbd-admin.vercel.app',
  'https://matify-frontend.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://www.goyalbookdepot.com',
  'http://localhost:5175',
  'http://localhost:3000',
]

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS ❌'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

// VERY IMPORTANT — handle preflight
app.options('*', cors())

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







