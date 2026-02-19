import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { init } from "next/dist/compiled/webpack/webpack";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    userEmail: string;
}

const initialState = {
    value:{
        isAuth: false,
        userEmail: '',
    } as AuthState,
} as InitialState;

export const auth= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: ()=>{
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>)=>{
            return {
                value:{
                    isAuth: true,
                    userEmail: action.payload,
                }
            }
        },
    }
});

export const { logIn, logOut } = auth.actions;

export default auth.reducer;