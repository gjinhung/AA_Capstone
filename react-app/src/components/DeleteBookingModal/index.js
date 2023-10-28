import './DeleteBookingModal.css'
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useModal } from "../../context/Modal";
import { allUsers } from '../../store/users';
import { deleteBooking, getBookings } from '../../store/booking';


function DeleteBookingModal({ booking_id }) {
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(deleteBooking(+booking_id))
    if (data) {
      setErrors(data)
    } else {
      dispatch(getBookings()).then(() =>
        dispatch(allUsers())).then(() =>
          closeModal())
    }
  }


  return (
    <div className="deleteBookingContainer">
      <div className="deleteHeader">Confirm Cancel</div>
      <div className="deleteText">Are you sure you want to cancel this tour?</div>
      <div>
        <button
          onClick={handleSubmit}
          className='confirm-yes'
        >
          Yes (Cancel Tour)
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

export default DeleteBookingModal;