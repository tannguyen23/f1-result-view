import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Race } from '../../types/raceResultType';
import { getDataFromRacesJson } from '../../utils/getDataFromJson';

function compare(a: Race, b: Race) {
	if (a.year < b.year) {
		return -1;
	}
	if (a.year > b.year) {
		return 1;
	}
	return 0;
}

interface RaceState {
	races: Race[];
	raceChart: {
		laps: (number | null)[];
		categories: string[];
	} | null;
}

const initialState: RaceState = {
	races: getDataFromRacesJson(),
	raceChart: null,
};

export const RaceSlice = createSlice({
	name: "race",
	initialState,
	reducers: {
		loadChart: (
			state,
			action: PayloadAction<{
				nameRace: string;
			}>
		) => {
			const raceData = getDataFromRacesJson();
			const filteredRace = raceData.filter((value) => {
				return value.name === action.payload.nameRace;
			});
			console.log(filteredRace);
			const tmpArr = filteredRace.sort(compare);
			const laps = tmpArr.map((value) => value.laps);

			const categories = tmpArr.map((value) => value.year.toString());
			state.raceChart = { laps, categories };
		},
		filter: (
			state,
			action: PayloadAction<{
				name: string;
				winner: string;
				car: string;
				laps: number[];
				year: number;
			}>
		) => {
			const raceData = getDataFromRacesJson();
			const name = action.payload.name;
			const winner = action.payload.winner;
			const car = action.payload.car;
			const lapStart = action.payload.laps[0];
			const lapEnd = action.payload.laps[1];
			const year = action.payload.year;
			const result: Race[] = [];
			raceData.map((value) => {
				if (
					value.name.toLowerCase().includes(name.toLowerCase().trim()) &&
					value.winner.toLowerCase().includes(winner.toLowerCase().trim()) &&
					value.car.toLowerCase().includes(car.toLowerCase().trim())
				) {
					if (value.laps !== null) {
						if (lapStart <= value.laps && value.laps <= lapEnd) {
							if (value.year === year || year === -1) {
								result.push(value);
							}
						}
					}
				}
			});
			state.races = result;
		},
		addRace: (state, action: PayloadAction<{ addRace: Race }>) => {
			// console.log("Adding Race");
			// action.payload.addRace.id = state.Races.length;
			// state.Races.push(action.payload.addRace);
		},
		deleteRace: (state, action: PayloadAction<{ deleteRaceId: number }>) => {
			console.log("Deleting Race");
			// const indexDeleteRaceId = state.Races.findIndex(
			//   (Race) => Race.id === action.payload.deleteRaceId
			// );
			// state.Races.splice(indexDeleteRaceId, 1);
		},
	},
});

export default RaceSlice.reducer;
export const { addRace, deleteRace, filter, loadChart } = RaceSlice.actions;
