const INITIAL_STATE = {
	usuarios: [],
};

function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "traer_usuarios":
			return { ...state, usuarios: action.payload };
		default:
			return { ...state };
	}
}

export default reducer;
