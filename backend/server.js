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

  'https://www.goyalbookdepot.com',
  'https://goyalbookdepot.com',
]

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, curl)
    if (!origin) return callback(null, true)

    // Check exact allowed origins
    if (allowedOrigins.includes(origin)) return callback(null, true)

    // Allow all localhost origins (any port)
    if (/^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
      return callback(null, true)
    }

    // Allow all Vercel domains (production and preview deployments)
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true)
    }

    // Allow Render domains
    if (/^https:\/\/.*\.onrender\.com$/.test(origin)) {
      return callback(null, true)
    }

    // Allow any subdomain of goyalbookdepot.com
    if (/^https:\/\/([a-zA-Z0-9-]+\.)?goyalbookdepot\.com$/.test(origin)) {
      return callback(null, true)
    }

    // Reject without throwing a 500 error
    callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Accept'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

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







