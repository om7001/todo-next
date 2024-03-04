// import mongoose from 'mongoose'

// const MONGOOSE_URI = process.env.MONGOOSE_URI

// const mongoConnection = () => {
//     mongoose.connect(MONGOOSE_URI, {
//     })
//         .then(() => {
//             console.log('Connected to MongoDB');
//         })
//         .catch((err) => {
//             console.error('MongoDB connection error:', err);
//         })
// };

// export default mongoConnection

import mongoose from "mongoose";

export const connectDBHandler = (handler: any) => async (req:Request, res:Response) => {
  if (mongoose.connections[0].readyState !== 1) {
    console.log("X not connected X")
    await mongoose
      .connect(process.env.MONGODB_URL||"")
      .then(() => console.log('db connected successfully🚀'))
      .catch(err => console.log('db connection Error = ', err))
  }
  return handler(req, res)
}

const db = mongoose.connection
db.once('ready', () => console.log(`connected to mongo on ${process.env.MONGODB_URL}`))