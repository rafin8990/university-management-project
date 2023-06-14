import ApiError from '../../../Error/ApiError'
import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utilities'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto incremental genrate  id

  const id = await generateUserId()

  user.id = id
  // default password

  if (!user.password) {
    user.password = config.default_user_PASS as string
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User')
  }
  return createdUser
}

export default {
  createUser,
}
