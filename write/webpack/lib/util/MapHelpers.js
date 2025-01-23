exports.provide = (map, key, computer) => {
	const value = map.get(key);
	if (value !== undefined) return value;
	const newValue = computer();
	map.set(key, newValue);
	return newValue;
};
