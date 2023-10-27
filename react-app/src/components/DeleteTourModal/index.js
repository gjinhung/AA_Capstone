import './DeleteTourModal.css'
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useModal } from "../../context/Modal";
import { allUsers } from '../../store/users';
import { deleteTour, getTours } from '../../store/tour';


function DeleteTourModal({ tour_id }) {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    console.log(+tour_id)
    const data = await dispatch(deleteTour(+tour_id))
    if (data) {
      console.log(data)
      setErrors(data)
    } else {
      dispatch(getTours()).then(() =>
        dispatch(allUsers())).then(() =>
          closeModal())
    }
  }


  return (
    <div className="deleteSpotContainer">
      <div className="deleteHeader">Confirm Delete</div>
      <div className="deleteText">Are you sure you want to delete this tour?</div>
      <div>
        <button
          onClick={handleSubmit}
          className='confirm-yes'
        >
          Yes (Delete Tour)
        </button>
        <button
          onClick={((e) => {
            closeModal();
          })}
          className='cancel'
        >
          No (Keep Tour)
        </button>
      </div>
    </div>
  )
}

export default DeleteTourModal;