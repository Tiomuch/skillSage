import baseServiceMethods from './baseServiceMethods'

const postService = {
  searchPostApi: (
    token: string,
    title: string,
    categoryId: number,
    limit = 10,
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(
      `/posts/?limit=${limit}&title=${title}&category_id=${categoryId}`,
      headers,
    )
  },
}

export default postService
