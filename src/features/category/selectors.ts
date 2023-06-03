import { CategoryState } from './categorySlice'

export const selectCategorySearch = (state: { category: CategoryState }) =>
  state.category.search

export const selectCategoryCategories = (state: { category: CategoryState }) =>
  state.category.categories
