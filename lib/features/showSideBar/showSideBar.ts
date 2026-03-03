import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { closeSync } from "fs";

type InitialState = {
    value: ShowSidebarState;
};

type ShowSidebarState = {
    showSidebar: boolean;
};

const initialState = {
    value: {
        showSidebar: false,
    } as ShowSidebarState,
} as InitialState;

export const showSidebar = createSlice({
    name: 'showSidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            return {
                value: {
                    showSidebar: true,
                }
            }
        },
        closeSidebar: (state) => {
            return initialState;
        }
    },
});

export const { openSidebar, closeSidebar } = showSidebar.actions;
export default showSidebar.reducer;