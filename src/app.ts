import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
import userRouter from '../src/app/modules/users/user.route'
import globalErrorHandler from './app/MiddleWares/globalErrorHandler'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)
/* app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Please check Your Error')
  // next('Shalar put Error Khaisos, solve kor age')
})
 */
app.use(globalErrorHandler)

export default app
