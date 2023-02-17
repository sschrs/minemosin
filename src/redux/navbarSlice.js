import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    navbarInfoText: undefined
}

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers:{
        changeInfoText : (state, action) => void(state.navbarInfoText = action.payload)
    }
})

export const { changeInfoText } = navbarSlice.actions;

export default navbarSlice.reducer;