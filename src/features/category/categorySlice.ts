import { createSlice } from '@reduxjs/toolkit'

export type Category = {
  id: number
  user_id: number
  title: string
  created_at: string
  post_count: number
}

export type CategoryState = {
  search: string
  loading: boolean
  error: any
  categories: Array<Category>
  total: number
}

const initialState: CategoryState = {
  search: '',
  categories: [],
  loading: false,
  error: null,
  total: 0,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategorySearch: (state, { payload }) => {
      state.search = payload
    },
    searchCategoryRequest: state => {
      state.loading = true
    },
    searchCategorySuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.categories = payload.data
      state.total = payload.total
    },
    searchCategoryFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.categories = initialState.categories
      state.total = initialState.total
    },
    clearCategoryFields: state => {
      state.search = initialState.search
      state.loading = initialState.loading
      state.error = initialState.error
      state.categories = initialState.categories
      state.total = initialState.total
    },
  },
})

export const {
  setCategorySearch,
  clearCategoryFields,
  searchCategoryRequest,
  searchCategorySuccess,
  searchCategoryFailure,
} = categorySlice.actions

export default categorySlice.reducer
