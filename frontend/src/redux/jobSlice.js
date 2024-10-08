import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allRecruiterJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchQuery: ""
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
        },

        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { setAllJobs, setSingleJob, setAllRecruiterJobs, setsearchJobByText, setAllAppliedJobs, setSearchQuery} = jobSlice.actions;

export default jobSlice.reducer