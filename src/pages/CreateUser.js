import axios from 'axios';
import React, {useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch } from "react-redux";
import { createUser } from '../store/actions';

export default function CreateUsers({navigation, ...props}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        address_1: '',
        address_2: '',
        town: '',
        region: '',
        country: '',
        postCode: '',
        contactNumber: '',
    })


    const handleChange = (event) => {
        const {name, value} = event.target
        setInputValues({...inputValues, [name]: value})
    }


    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
       await dispatch(createUser(inputValues))
            .then(data => {
                console.log(data)
                setLoading(false)
                alert("User created successfully")
                navigate('/')
            }).catch(err => alert(err.message || err || "Something went wrong creating the user"))
        setLoading(false)
    }


    return (
        <div className="page-container form-page">
            <div className='navbar-container'>
                <Link to="/">
                    <div className="row">
                        <i className='fa fa-arrow-left navbar-icon'> </i>
                        <div className='navbar-text'>Back</div>
                    </div>
                </Link>
                <div className="navbar-title" data-testid="navbar-title">Create User</div>
            </div>
            <form className='form-container' onSubmit={handleSubmit}>
                <label>
                    First Name: <input
                        type="text"
                        name="firstName"
                        required
                        value={inputValues.firstName}
                        onChange={handleChange} />
                </label>
                <label>
                    Last Name: <input
                        type="text"
                        name="lastName"
                        required
                        value={inputValues.lastName}
                        onChange={handleChange} />
                </label>
                <label>
                    Address One: <input
                        type="address"
                        name="address_1"
                        value={inputValues.address_1}
                        onChange={handleChange} />
                </label>
                <label>
                    Address Two: <input
                        type="address"
                        name="address_2"
                        value={inputValues.address_2}
                        onChange={handleChange} />
                </label>
                <label>
                    Town: <input
                        type="text"
                        name="town"
                        value={inputValues.town}
                        onChange={handleChange} />
                </label>
                <label>
                    Region: <input
                        type="text"
                        name="region"
                        value={inputValues.region}
                        onChange={handleChange} />
                </label>
                <label>
                    Country: <input
                        type="text"
                        name="country"
                        value={inputValues.country}
                        onChange={handleChange} />
                </label>
                <label>
                    PostCode: <input
                        type="text"
                        name="postCode"
                        value={inputValues.postCode}
                        onChange={handleChange} />
                </label>
                <label>
                    Contact Number: <input
                        type="text"
                        name="contactNumber"
                        value={inputValues.contactNumber}
                        onChange={handleChange} />
                </label>
                <button className="submit-button red">
                    {loading ? "Creating" : "Create User"}
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
                </button>
                <Link to="/">
                    <div className="row">
                        <i className='fa fa-arrow-left'></i>
                        <div className='navbar-text'>Cancel</div>
                    </div>
                </Link>
            </form>
        </div>
    )
}
