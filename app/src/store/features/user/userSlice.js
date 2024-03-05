
import {createSlice} from "@reduxjs/toolkit";
import {getUserSync} from "./userActions";

/* User Data Initial State */
const initialState = {
    userData: null,
    authToken: null,
    permissions: null,
    loading: true,
};

/* User Data Reducer */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDataAction: (state, action) => {
            state.userData = action.payload;
        },
        setAuthTokenAction: (state, action) => {
            state.authToken = action.payload;
        },
        setUserPermissionAction: (state, action) => {
            state.permissions = action.payload;
        },
        clearUserData: (state, action) => {
            state = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserSync.pending, (state) => {
                state.loading = true;
            })
        builder.addCase(getUserSync.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) state.userData = action.payload;
        })
        builder.addCase(getUserSync.rejected, (state, action) => {
            state.loading = false;
            console.error(action.payload)
        });
    },
})

export const {setUserDataAction, setAuthTokenAction, setUserPermissionAction, clearUserData} = userSlice.actions;
export default userSlice.reducer;