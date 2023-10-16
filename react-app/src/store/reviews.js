// constants
const LOAD_REVIEWS = "review//LOAD_REVIEWS";
const REMOVE_REVIEWS = "review/REMOVE_REVIEWS";
const UPDATE_REVIEWS = 'review/UPDATE_REVIEWS'

const loadReview = (data) => ({
    type: LOAD_REVIEWS,
    payload: data,
});

const postReview = (data) => ({
    type: UPDATE_REVIEWS,
    payload: data
})

const removeReview = (data) => ({
    type: REMOVE_REVIEWS,
    payload: data
});

export const getReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReview(data['reviews']));
    } else {
        return { 'errors': "Get Reviews Thunk Failed" };
    }
};

export const getOneReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReview(data));
        return data
    } else {
        const data = await response.json()
        return data;
    }
};

export const newReview = (review, id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/tour/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postReview(data));
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["A new review error occurred. Please try again."];
    }
};

export const editReview = (id, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postReview(data));
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred while updating review. Please try again."];
    }
};

export const deleteReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeReview(id));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred while deleting a review. Please try again."];
    }
};

const initialState = { reviews: null };

const reviews = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, ...action.payload };
        case UPDATE_REVIEWS:
            const data = action.payload
            newState[data.id] = data
            return newState
        case REMOVE_REVIEWS:
            return newState[action.payload] = null
        default:
            return state;
    }
}


export default reviews;