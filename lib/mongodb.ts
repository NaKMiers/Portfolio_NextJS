import mongoose, { Connection } from 'mongoose'

const mongodbUri = process.env.MONGODB_URI!

let cachedConnection: Connection | null = null

export async function connectDatabase() {
  if (cachedConnection) {
    console.info('Returning cached database connection')
    return cachedConnection
  }

  try {
    await mongoose.connect(mongodbUri)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.info('MongoDB connected successfully')
    })

    connection.on('error', error => {
      console.error('MongoDB connection error. Please make sure MongoDB is running. ' + error)
    })

    cachedConnection = connection
    return connection
  } catch (error) {
    console.error('Something goes wrong!')
    console.error(error)
    throw new Error('Unable to connect to database')
  }
}

export async function disconnectDatabase() {
  if (!cachedConnection) {
    console.info('No active connection to disconnect.')
    return
  }

  try {
    await mongoose.disconnect()
    cachedConnection = null
    console.info('MongoDB disconnected successfully')
  } catch (error) {
    console.error('Error while disconnecting from MongoDB:', error)
  }
}
