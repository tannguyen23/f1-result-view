import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Driver } from '../../types/driverResultType';
import { getAllNationalityFromDriverJson, getDataFromDriversJson } from '../../utils/getDataFromJson';

interface DriverState {
	drivers: Driver[];
	driverChart: {
		positions: (number | null)[];
		points: (number | null)[];
		categories: string[];
	} | null;
	driverPieChart: {
		countWin: number[];
		categories: string[];
	} | null;
}

const initialState: DriverState = {
	drivers: getDataFromDriversJson(),
	driverChart: null,
	driverPieChart: null,
};

function compare(a: Driver, b: Driver) {
	if (a.year < b.year) {
		return -1;
	}
	if (a.year > b.year) {
		return 1;
	}
	return 0;
}

export const DriverSlice = createSlice({
	name: "driver",
	initialState,
	reducers: {
		loadChart: (
			state,
			action: PayloadAction<{
				nameDriver: string;
			}>
		) => {
			const driverData = getDataFromDriversJson();
			const filteredDriver = driverData.filter((value) => {
				return (
					value.name === action.payload.nameDriver && value.position !== null
				);
			});
			const tmpArr = filteredDriver.sort(compare);
			const points = tmpArr.map((value) => value.point);
			const positions = tmpArr.map((value) => value.position);
			const categories = tmpArr.map((value) => value.year.toString());
			state.driverChart = { points, positions, categories };
		},
		loadPieChart: (state) => {
			const driverData = getDataFromDriversJson();
			const natData = getAllNationalityFromDriverJson();
			const countWin: number[] = [];
			const categories: string[] = [];
			natData.map((nat) => {
				const count = driverData.filter((value) => {
					return value.nationality === nat.name && value.position === 1;
				}).length;
				if (count > 0) {
					countWin.push(count);
					categories.push(nat.name);
				}
			});
			console.log(JSON.stringify({ countWin, categories }))
			state.driverPieChart = { countWin, categories };
		},
		filter: (
			state,
			action: PayloadAction<{
				name: string;
				nationality: string;
				car: string;
				position: number;
				pointRange: number[];
				year: number;
			}>
		) => {
			const driverData = getDataFromDriversJson();
			const name = action.payload.name;
			const nationality = action.payload.nationality;
			const car = action.payload.car;
			const position = action.payload.position;
			const pointStart = action.payload.pointRange[0];
			const pointEnd = action.payload.pointRange[1];
			const year = action.payload.year;

			const result: Driver[] = [];
			driverData.map((value) => {
				//Search name
				if (
					value.name.toLowerCase().includes(name.toLowerCase().trim()) &&
					value.nationality
						.toLowerCase()
						.includes(nationality.toLowerCase().trim()) &&
					value.car.toLowerCase().includes(car.toLowerCase().trim())
				) {
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
				state.drivers = result;
			});
		},
		addDriver: (state, action: PayloadAction<{ addDriver: Driver }>) => {
			// console.log("Adding Driver");
			// action.payload.addDriver.id = state.Drivers.length;
			// state.Drivers.push(action.payload.addDriver);
		},
		deleteDriver: (
			state,
			action: PayloadAction<{ deleteDriverId: number }>
		) => {
			console.log("Deleting Driver");
			// const indexDeleteDriverId = state.Drivers.findIndex(
			//   (Driver) => Driver.id === action.payload.deleteDriverId
			// );
			// state.Drivers.splice(indexDeleteDriverId, 1);
		},
	},
});

export default DriverSlice.reducer;
export const { addDriver, deleteDriver, filter, loadChart,loadPieChart } =
	DriverSlice.actions;
