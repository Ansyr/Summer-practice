import {createSlice} from "@reduxjs/toolkit";



const initialState =  {
    data: {
        bookName: '',
        publishYear: '',
        authorId: null,
        price: null,
        discount: null,
        amount: null,
    },

}


export const BookFormSlice = createSlice({
    name: "bookForm",
    initialState,
    reducers: {
        setFormData(state,action){
            state.data = action.payload
        },
        setSelectedAuthorIds(state,action){
            state.data.authorId = action.payload
        }
    }
})

export const {setFormData,setSelectedAuthorIds} = BookFormSlice.actions
export default BookFormSlice