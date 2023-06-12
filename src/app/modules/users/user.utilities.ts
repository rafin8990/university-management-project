import { User } from './user.model'

// let lastUserId = 0

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  //   increment by one
  const incrementalId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementalId

  //   lastUserId++
  //   return String(lastUserId).padStart(5, '0')
}
