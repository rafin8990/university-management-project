import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function run() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database Is connected successfully')
    app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
run().catch(error => console.log(error))
