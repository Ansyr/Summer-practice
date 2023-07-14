import {createSlice} from "@reduxjs/toolkit";



const initialState =  {
    data: {
        lastname: '',
            firstname: '',
            surname: '',
            birthDate: '',
            region: '',
            city: '',
            microdistrict: '',
            houseNum: '',
            apartNum: '',
            bookIds: {
                id: []
            }
    },

}


export const UserFormSlice = createSlice({
    name: "userForm",
        initialState,
        reducers: {
            setFormData(state,action){
                state.data = action.payload
            },
            setSelectedBookIds(state,action){
                state.data.bookIds = action.payload
            }
        }
})

export const {setFormData,setSelectedBookIds} = UserFormSlice.actions
export default UserFormSlice.reducer