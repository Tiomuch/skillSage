import baseServiceMethods from './baseServiceMethods'

const profileService = {
  updateUserApi: (data: { username: string; password: string }) => {
    return baseServiceMethods.post(`/auth/profile`, data)
  },
}

export default profileService
