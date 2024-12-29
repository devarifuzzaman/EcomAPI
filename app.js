import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import router from './src/routes/api.js';
import {DATABASE, MAX_JSON_SIZE, URL_ENCODED,WEB_CACHE, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, option} from './src/config/config.js';


const app = express();

// Global Application Middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
 app.use(limiter);



 // MongoDB connection
 mongoose.connect(DATABASE,option).then((res)=>{
  console.log("MongoDB connected");
 }).catch((err)=>{
  console.log(err);
 })

 //Web Caching
app.set('etag',WEB_CACHE);
 // Set API Route
app.use("/api/v1",router);

export default app;