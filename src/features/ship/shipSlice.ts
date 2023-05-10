import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { AgentsApi, Contract, ContractsApi, FleetApi, Ship } from "../../spacetraders-sdk";
import { configuration, instance } from "../../SpaceTraderAPI";

export interface ShipState {
    ships: Array<Ship>;
    status: "not-loaded" | "loading" | "loaded" | "error";
}

const initialState: ShipState = {
    ships: [],
    status: "not-loaded"
};

export const listMyShips = createAsyncThunk(
    "ship/listMyShips",
    async () => {
        const shipsApi = new FleetApi(configuration, undefined, instance);
        const response =  await shipsApi.getMyShips();
        const agentData = response.data;
        return agentData.data;
    }
);

export const shipSlice = createSlice({
    name: "agent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listMyShips.pending, (state) => {
                state.status = "loading";
            })
            .addCase(listMyShips.fulfilled, (state, action) => {
                state.ships = action.payload;
                state.status = "loaded";
            })
            .addCase(listMyShips.rejected, (state) => {
                state.status = "error";
            });
    },
});

export const { } = shipSlice.actions;

export const selectShips = (state: RootState) => state.ship.ships;

export default shipSlice.reducer;
