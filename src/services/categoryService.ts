import baseServiceMethods from './baseServiceMethods'

const categoryService = {
  searchCategoryApi: (token: string, title: string, limit = 10) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(
      `/categories/?limit=${limit}&title=${title}`,
      headers,
    )
  },
}

export default categoryService
