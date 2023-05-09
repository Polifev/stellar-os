import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { AgentsApi } from "../../spacetraders-sdk";
import { configuration, instance } from "./agentAPI";

export interface AgentState {
    agent: any;
    status: "unauthorized" | "authorized";
    token: string;
}

const initialState: AgentState = {
    agent: null,
    status: "unauthorized",
    token: "",
};

export const getMyAgentAsync = createAsyncThunk(
    "agent/getMyAgent",
    async (token: string) => {
        const agentAPI = new AgentsApi(configuration, undefined, instance);
        const response =  await agentAPI.getMyAgent();
        const agentData = response.data;
        return agentData.data;
    }
);

export const agentSlice = createSlice({
    name: "agent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyAgentAsync.pending, (state) => {
                // Do nothing
            })
            .addCase(getMyAgentAsync.fulfilled, (state, action) => {
                state.status = "authorized";
                state.agent = action.payload;
            })
            .addCase(getMyAgentAsync.rejected, (state) => {
                state.status = "unauthorized";
            });
    },
});

export const { } = agentSlice.actions;

export const selectAgent = (state: RootState) => state.agent.agent;

export default agentSlice.reducer;
