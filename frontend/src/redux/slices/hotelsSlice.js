import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchAllHotels = createAsyncThunk(
    'hotels/fetchAllHotels',
    async ({page = 1, limit = 10}, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:3001/hotels?_page=${page}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch hotels');
            }
            const data = await response.json();
            const totalCount = response.headers.get('X-Total-Count');

            return {
                hotels: data,
                totalCount: totalCount ? parseInt(totalCount, 10) : data.length,
                currentPage: page,
                limit: limit,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchHotels = createAsyncThunk(
    'hotels/searchHotels',
    async ({city, page = 1, limit = 10}, {rejectWithValue}) => {
        try {

            const response = await fetch(
                `http://localhost:3001/search?city=${city}&_page=${page}&_limit=${limit}`
            );
            if (!response.ok) {
                throw new Error('Failed to search hotels');
            }
            const data = await response.json();
            const totalCount = response.headers.get('X-Total-Count');

            return {
                hotels: data,
                totalCount: totalCount ? parseInt(totalCount, 10) : data.length,
                currentPage: page,
                limit: limit,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchHotelById = createAsyncThunk(
    'hotels/fetchHotelById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:3001/hotels/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch hotel details');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: {
        list: [],
        selectedHotel: null,
        status: 'idle',
        error: null,
        totalHotels: 0,
        currentPage: 1,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHotels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllHotels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.hotels;
                state.totalHotels = action.payload.totalCount;
                state.currentPage = action.payload.currentPage;
                state.limit = action.payload.limit;
            })
            .addCase(fetchAllHotels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(searchHotels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchHotels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.hotels;
                state.totalHotels = action.payload.totalCount;
                state.currentPage = action.payload.currentPage;
                state.limit = action.payload.limit;
            })
            .addCase(searchHotels.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchHotelById.pending, (state) => {
                state.status = 'loading';
                state.selectedHotel = null;
            })
            .addCase(fetchHotelById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedHotel = action.payload;
            })
            .addCase(fetchHotelById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.selectedHotel = null;
            });
    },
});

export default hotelsSlice.reducer;