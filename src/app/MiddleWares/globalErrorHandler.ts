import { ErrorRequestHandler } from 'express'
import handleValidationError from '../../Error/handleValidationError'
import { IGenericErrorMessages } from '../../Interfaces/error'
import config from '../../config'
import ApiError from '../../Error/ApiError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something Went Wrong!!!'
  let errorMessages: IGenericErrorMessages[] = []

  if (error?.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(400).json({ error: error })

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
