import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./EditReviewModal.css";
import StarsRating from "./StarsRating";
import { allUsers } from "../../store/users";
import { editReview, getReviews } from "../../store/reviews";

function EditReviewModal({ guide_id, review }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    //  console.log('THIS IS THE REVIEW FROM EDIT REVIEW MODAL', reviews)
    const [errors, setErrors] = useState({});
    const [stars, setStars] = useState(review.rating);
    const [comment, setComment] = useState(review.review_body);
    const [formDisabled, setFormDisabled] = useState(true);
    const { closeModal } = useModal();

    //   useEffect(() => {
    //     //dispatch(fetchOneBusiness(id));
    //     dispatch(oneBussinessReviewsThunk(business_id));
    //   }, [dispatch, review_id]);

    useEffect(() => {
        const errors = {};
        if (stars && stars < 1) {
            errors.stars = "Please input a star rating";
        }
        if (comment && comment.length < 10) {
            errors.comment = "Comment needs a minimum of 10 characters";
        }
        setErrors(errors);
    }, [stars, comment]);

    useEffect(() => {
        if (!stars || !comment || stars < 1 || comment.length < 10) {
            setFormDisabled(true);
        } else {
            setFormDisabled(false);
        }
    }, [dispatch, stars, comment]);

    const onChange = (stars) => {
        setStars(stars);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let submittedReview = {
            'rating': stars,
            'review_body': comment,
            'guide_id': +guide_id
        }

        await dispatch(editReview(+review.id, submittedReview)).then(() => {
            dispatch(getReviews()).then(() =>
                dispatch(allUsers()))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        })
        closeModal();
    };

    if (!user) return <div>Loading...</div>;
    return (
        <div id="editReviewContainer">
            <div className="editReviewHeading">Edit Your Review</div>
            <label>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="comment-input"
                    placeholder="Edit your review here..."
                />
            </label>
            {errors.comment && <div>{errors.comment}</div>}
            <div className="rating-input">
                <StarsRating disabled={false} stars={stars} onChange={onChange} />
                <div>Stars</div>
                {errors.rating && <div>{errors.rating}</div>}
            </div>
            <button
                onClick={handleSubmit}
                className={formDisabled ? "submit-button-inactive" : "submit-button"}
                type="submit"
                disabled={formDisabled}
            >
                Save Changes
            </button>
        </div>
    );
}

export default EditReviewModal;