import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Agent, fetchMyAgent } from "./agentAPI";

export interface AgentState {
    agent: Agent | null;
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
        return await fetchMyAgent(token);
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
                state.agent = action.payload.agent;
                state.token = action.payload.token;
            })
            .addCase(getMyAgentAsync.rejected, (state) => {
                state.status = "unauthorized";
            });
    },
});

export const { } = agentSlice.actions;

export const selectAgent = (state: RootState) => state.agent.agent;

export default agentSlice.reducer;
