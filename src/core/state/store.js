import { configureStore } from '@reduxjs/toolkit'
import attributeReducer from './attributeSlice'
import skillReducer from './skillSlice'

export default configureStore({
  reducer: {
    attributes: attributeReducer,
    skills: skillReducer,
  }
})