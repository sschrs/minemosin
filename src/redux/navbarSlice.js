import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbarInfoText : ""
}

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers:{
        changeInfoText : (state, action) => state.navbarInfoText = action.payload
    }
})

export const { changeInfoText } = navbarSlice.actions;

export default navbarSlice.reducer;