import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
  msg: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getCategory(state, action) {
      state.category = action.payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    getMsg(state, action) {
      state.msg = action.payload;
    },
    clearMsg(state) {
      state.msg = null;
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export { categoryActions, categoryReducer };
