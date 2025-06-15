import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDestinations = createAsyncThunk(
    'destinations/fetchDestinations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/destinations');
            if (!response.ok) {
                throw new Error('Failed to fetch destinations');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchDestinations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default destinationsSlice.reducer;