import {createAsyncThunk} from "@reduxjs/toolkit";
import {urlConstants} from "@/_constants/urlConstants";
import AxiosAPI from "@/_services/axiosInstance";

/* @thunk function for fetching and setting user information */
export const getUserSync = createAsyncThunk(
    'user/syncDetails',
    async (data, {rejectWithValue}) => {
        try {
            const res = await AxiosAPI.get(urlConstants.user_detail);
            switch (res.status) {
                case 200:
                    return res.data.userDetails
                // TODO: Handle User Not Found
                default:
                    return rejectWithValue('User Not Found!')
            }
        } catch (Err) {
            console.error('Err', Err)
            return rejectWithValue(Err)
        }
    })
