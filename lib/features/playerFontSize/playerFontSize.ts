import { createSlice } from "@reduxjs/toolkit";


type InitialState = {
    value: FontSizeState;
}

type FontSizeState = {
    fontSize: string;
}

const initialState = {
    value: {
        fontSize: '',
    } as FontSizeState,
} as InitialState;

export const playerFontSize = createSlice({
    name: 'playerFontSize',
    initialState,
    reducers: {
        fontSizeSmall: () => {
            return {
                value: {
                    fontSize: 'small',
                }
            }
        },
        fontSizeMedium: () => {
            return {
                value: {
                    fontSize: 'medium',
                }
            }
        },
        fontSizeLarge: () => {
            return {
                value: {
                    fontSize: 'large',
                }
            }
        },
        fontSizeXlarge: () => {
            return {
                value: {
                    fontSize: 'xlarge',
                }
            }
        }
    }
});

export const { fontSizeSmall,fontSizeMedium, fontSizeLarge, fontSizeXlarge } = playerFontSize.actions;
export default playerFontSize.reducer;
