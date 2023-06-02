import baseServiceMethods from './baseServiceMethods'

const profileService = {
  updateUserApi: (
    data: { username?: string; nickname?: string },
    token: string,
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.put(`/auth/profile`, data, headers)
  },
}

export default profileService
