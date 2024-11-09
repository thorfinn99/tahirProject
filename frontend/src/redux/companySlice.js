import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        filterWord:""
    },
    reducers: {
        setSingleCompany: (state,action) => {
            state.singleCompany = action.payload
        },
        setCompanies: (state,action) => {
            state.companies = action.payload
        },
        setFilterWord: (state,action) => {
            state.filterWord = action.payload
        }
    }
})

export const {setSingleCompany,setCompanies,setFilterWord } = companySlice.actions
export default companySlice.reducer;