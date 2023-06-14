import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorLogger } from './Shared/Logger'

async function run() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Is connected successfully')
    app.listen(config.port, () => {
      logger.info(`application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
run().catch(error => errorLogger.error(error))
