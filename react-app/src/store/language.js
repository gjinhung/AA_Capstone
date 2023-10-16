// constants
const LOAD_LANGUAGES = "language/LOAD_LANGUAGES";

const loadLanguages = (data) => ({
    type: LOAD_LANGUAGES,
    payload: data,
});

export const getLanguages = () => async (dispatch) => {
    const response = await fetch(`/api/languages`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadLanguages(data));
    } else {
        return (await response.json());
    }
};


const initialState = { languages: null };

const cities = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case LOAD_LANGUAGES:
            return { ...action.payload }
        default:
            return state;
    }
}


export default cities;