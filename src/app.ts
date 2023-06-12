import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import userRouter from '../src/app/modules/users/user.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('User created successfully')
})

export default app
