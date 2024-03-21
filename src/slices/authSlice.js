import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    sucess: false,
    error: false,
    loading: false
}

//Register an user and sign in
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        const response = await authService.register(user);
        
        if(response.errors){
            return thunkAPI.rejectWithValue(response.errors[0]);
        }

        return response;
    }
);

//logout an user
export const logout = createAsyncThunk(
    'auth/logout',
    async (user, thunkAPI) => {
        await authService.logout(user);
        return null;
    }
);

//login an user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        const response = await authService.login(user);
        
        if(response.errors){
            return thunkAPI.rejectWithValue(response.errors[0]);
        }

        return response;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.sucess = false;
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.sucess = false;
            state.error = false;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = action.payload;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.loading = false;
            state.sucess = false;
            state.error = false;
        });

        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.sucess = false;
            state.error = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = action.payload;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;