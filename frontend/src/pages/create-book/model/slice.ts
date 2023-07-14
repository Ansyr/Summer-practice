import {createSlice} from "@reduxjs/toolkit";



const initialState =  {
    data: {
        bookName: '',
        publishYear: '',
        authorId: 0,
        saleId: ''
    },

}


export const BookFormSlice = createSlice({
    name: "bookForm",
    initialState,
    reducers: {
        setFormData(state,action){
            state.data = action.payload
        },
    }
})

export const {setFormData} = BookFormSlice.actions
export default BookFormSlice