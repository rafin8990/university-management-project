import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../Interfaces/common'
import { IGenericErrorMessages } from '../Interfaces/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
