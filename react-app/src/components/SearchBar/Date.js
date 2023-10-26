import React, { useRef } from "react";
import { useState } from "react";
import { useSearch } from "../../context/SearchBar";

export default function DateSelection() {
    let menuRef = useRef()
    let dateRef = useRef('')
    const [dayOfWk, setDayOfWk] = useState('');
    const [error, setError] = useState('')
    const { searchTerms, setSearch } = useSearch()

    // useEffect(() => {
    //     let handler = (e) => {
    //         if (!menuRef.current.contains(e.target))
    //             setShow(false)
    //     }

    //     document.addEventListener('mousedown', handler)

    //     return () => {
    //         document.removeEventListener('mousedown', handler)
    //     }
    // }, [menuRef])

    // const normalized_dates = Object.values(dates)
    // normalized_dates.forEach((date) => {
    //     options.push(date.date)
    // })
    // options.sort()
    // const opt_arr = Array.from(options)
    // opt_arr.push("Any")

    // function handleDropDown() {
    //     setShow(!show)
    // }

    function handleSelected(e) {
        let obj = searchTerms
        if (e.toLowerCase() === "any") {
            obj.date = ''
        } else {
            obj.date = e
            setSearch(obj)
        }
        // setShow(false)
    }
    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleChange = (e) => {
        dateRef.current = e
        let year = dateRef.current.substring(0, 4);
        let month = dateRef.current.substring(5, 7);
        let day = dateRef.current.substring(8, 10);
        let newDate = new Date(`${year}-${month}-${day}`);
        let currentDate = new Date()
        if ((newDate - currentDate) < 0) {
            setError("Past Dates are Invalid")
            handleSelected('any')
        } else {
            setDayOfWk(weekday[newDate.getDay()])
            handleSelected(dayOfWk)
            setError('')
        }
    };

    function reset() {
        dateRef.current = ''
        setDayOfWk('')
    }

    return (
        <>
            <div ref={menuRef} className="date-button">
                <input
                    type="date"
                    value={dateRef.current}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {error ? <>
                    <div style={{ color: "red" }}>{error}</div>
                </> :
                    <div>Selected Date: {dayOfWk}</div>
                }
            </div>
            <div onClick={() => reset()}>
                X
            </div>
        </>
    );
}