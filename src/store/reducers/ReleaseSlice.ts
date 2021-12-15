import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTitle } from '../../api/releaseApi'
import { animeItem } from '../../types'

export interface ReleaseState {
  title: animeItem | null
  isLoading: boolean
  error: string | null
}

const initialState: ReleaseState = {
  title: null,
  isLoading: false,
  error: null,
}

export const fetchTitle = createAsyncThunk('release/fetchTitle', async (code: string, thunkAPI) => {
  try {
    const response = await getTitle(code)
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

export const ReleaseSlice = createSlice({
  name: 'release',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTitle.fulfilled.type]: (state, action: PayloadAction<animeItem>) => {
      state.isLoading = false
      state.error = null
      state.title = action.payload
    },
    [fetchTitle.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchTitle.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {} = ReleaseSlice.actions

export default ReleaseSlice.reducer
