const getArrYear = () => {
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	const arr = [];
	for (let index = 1950; index <= year; index++) {
		arr.push(index);
	}
  return arr;
};

export { getArrYear };
