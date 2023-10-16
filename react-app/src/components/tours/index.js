import React from "react";
import { useSelector } from "react-redux";

const Tours = () => {
    const tours = useSelector((state) => state.tours)
    const users = useSelector((state) => state.users)


}