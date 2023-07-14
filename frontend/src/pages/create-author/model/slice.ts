import {createSlice} from "@reduxjs/toolkit";



const initialState =  {
    data: {
        lastname: '',
        firstname: '',
        surname: '',
    }
}


export const AuthorFormSlice = createSlice({
    name: "authorForm",
    initialState,
    reducers: {
        setFormData(state,action){
            state.data = action.payload
        },
    }
})

export const {setFormData} = AuthorFormSlice.actions
export default AuthorFormSlice.reducer