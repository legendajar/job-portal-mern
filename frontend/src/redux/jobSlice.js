import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allRecruiterJobs: [],
        singleJob: null,
        searchJobByText: "",
    }, 
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },

        setAllRecruiterJobs: (state, action) => {
            state.allRecruiterJobs = action.payload;
        },

        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        }
    }
});

export const { setAllJobs, setSingleJob, setAllRecruiterJobs, setsearchJobByText } = jobSlice.actions;

export default jobSlice.reducer