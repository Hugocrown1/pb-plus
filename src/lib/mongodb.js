import {connect, connection} from 'mongoose'

export async function connectDB(){
    const db = await connect(process.env.MONGODB_URI)
    console.log(db.connection.db)
}

connection.on('connected', () => {
  console.log('mongoose is connected')
})

connection.on('error', (err) => {
  console.log('mongoose is connection error', err)
})