import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API isteği için async thunk
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("http://localhost:3001/get-order/"); // API URL'nizi yazın
  return response.data; // Response'u döndür
});

// Slice tanımı
const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Gelen veriyi state'e aktar
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
