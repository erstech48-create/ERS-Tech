import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  AllBlogs: null,
  error: "",
  loading: false,
};

export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://blogs.erstech.org/wp-json/custom/v1/posts/?page=1&per_page=${limit}`
      );
      const resData = res.data;
      return {
        data: resData,
        message: "success",
      };
    } catch (error) {
      console.error("Error....", error);
      return rejectWithValue({ message: "Failed to fetch blogs" });
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogs: (state) => {
      state.blogs = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for getBlogs ======
    builder.addCase(getBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.AllBlogs = action.payload.data;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default blogSlice.reducer;
export const { clearBlogs } = blogSlice.actions;
