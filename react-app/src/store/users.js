// constants
const GET_USERS = "users/GET_USERS";

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});


const initialState = { user: null };

export const allUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getUsers(data['users']));
	}
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return { ...action.payload };
		default:
			return state;
	}
}