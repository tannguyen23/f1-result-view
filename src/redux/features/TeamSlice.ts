import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Team } from '../../types/teamResultType';
import { getAllTeamFromTeamJson, getDataFromTeamsJson } from '../../utils/getDataFromJson';

interface TeamState {
	teams: Team[];
	teamChart: {
		points: (number | null)[];
		positions: (number | null)[];
		categories: string[];
	} | null;
	teamPieChart: {
		countWin: number[];
		categories: string[];
	} | null;
}

const initialState: TeamState = {
	teams: getDataFromTeamsJson(),
	teamChart: null,
	teamPieChart : null,
};

function compare(a: Team, b: Team) {
	if (a.year < b.year) {
		return -1;
	}
	if (a.year > b.year) {
		return 1;
	}
	return 0;
}

export const TeamSlice = createSlice({
	name: "team",
	initialState,
	reducers: {
		loadChart: (
			state,
			action: PayloadAction<{
				nameTeam: string;
			}>
		) => {
			const teamData = getDataFromTeamsJson();
			const filteredTeam = teamData.filter((value) => {
				return (
					value.name === action.payload.nameTeam && value.position !== null
				);
			});
			console.log(filteredTeam);
			const tmpArr = filteredTeam.sort(compare);
			const points = tmpArr.map((value) => value.point);
			const positions= tmpArr.map((value) => value.position);
			const categories = tmpArr.map((value) => value.year.toString());
			state.teamChart = { points, positions, categories };
		},
		loadPieChart: (state) => {
			const teamData = getDataFromTeamsJson();
			const teamArr = getAllTeamFromTeamJson();
			const countWin: number[] = [];
			const categories: string[] = [];
			teamArr.map((team) => {
				const count = teamData.filter((value) => {
					return value.name === team.name && value.position === 1;
				}).length;
				if (count > 2) {
					countWin.push(count);
					categories.push(team.name);
				}
			});
			console.log(JSON.stringify({ countWin, categories }))
			state.teamPieChart = { countWin, categories };
		},
		filter: (
			state,
			action: PayloadAction<{
				name: string;
				position: number;
				pointRange: number[];
				year: number;
			}>
		) => {
			const teamData = getDataFromTeamsJson();

			const name = action.payload.name;
			const position = action.payload.position;
			const pointStart = action.payload.pointRange[0];
			const pointEnd = action.payload.pointRange[1];
			const year = action.payload.year;
			console.log(`point start: ${pointStart} point end: ${pointEnd}`);
			const result: Team[] = [];
			teamData.map((value) => {
				//Search name
				if (value.name.toLowerCase().includes(name.toLowerCase().trim())) {
					//Seach position
					if (value.position !== null) {
						if (position === value.position || position === -1) {
							//Search point
							if (value.point >= pointStart && value.point <= pointEnd) {
								//Search year
								if (value.year === year || year === -1) {
									result.push(value);
								}
							}
						}
					}
				}
				state.teams = result;
			});
		},
		addTeam: (state, action: PayloadAction<{ addTeam: Team }>) => {
			// console.log("Adding team");
			// action.payload.addTeam.id = state.teams.length;
			// state.teams.push(action.payload.addTeam);
		},
		deleteTeam: (state, action: PayloadAction<{ deleteTeamId: number }>) => {
			console.log("Deleting team");
			// const indexDeleteTeamId = state.teams.findIndex(
			//   (team) => team.id === action.payload.deleteTeamId
			// );
			// state.teams.splice(indexDeleteTeamId, 1);
		},
	},
});

export default TeamSlice.reducer;
export const { addTeam, deleteTeam, filter, loadChart,loadPieChart } = TeamSlice.actions;
