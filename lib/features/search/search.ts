import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: SearchState;
}

type SearchState = {
    searchTerm: string;
}

const initialState = {
    value: {
        searchTerm: '',
    } as SearchState,
} as InitialState;

export const search = createSlice({
    name: 'search',
    initialState,
    reducers: { 
        searchBook: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    ...state.value,
                    searchTerm: action.payload,
                },
            };
        },
    },
});

export const { searchBook } = search.actions;
export default search.reducer;