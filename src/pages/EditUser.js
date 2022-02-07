import React, {useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch } from "react-redux";
import { updateUser, getUser } from '../store/actions';


export default function EditUsers(props) {
    const params = useLocation();
    const dispatch = useDispatch()
    const [user, setUser] = useState(params.state?.user);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [inputValues, setInputValues] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        address_1: user.address_1 || '',
        address_2: user.address_2 || '',
        town: user.town || '',
        region: user.region || '',
        country: user.country || '',
        postCode: user.postCode || '',
        contactNumber: user.contactNumber || '',
        id: user.id || ''
    })


    const getCurrentUser = async () => {
       await dispatch(getUser(user.id))
            .then(data => {
                console.log(data?.data?.data, "returned data")
                setInputValues({
                    firstName: data?.data?.data?.firstName || '',
                    lastName: data?.data?.data?.lastName || '',
                    address_1: data?.data?.data?.address_1 || '',
                    address_2: data?.data?.data?.address_2 || '',
                    town: data?.data?.data?.town || '',
                    region: data?.data?.data?.region || '',
                    country: data?.data?.data?.country || '',
                    postCode: data?.data?.data?.postCode || '',
                    contactNumber: data?.data?.data?.contactNumber || '',
                    id: data?.data?.data?.id || ''
                })
                setUser({
                    firstName: data?.data?.data?.firstName || '',
                    lastName: data?.data?.data?.lastName || '',
                    address_1: data?.data?.data?.address_1 || '',
                    address_2: data?.data?.data?.address_2 || '',
                    town: data?.data?.data?.town || '',
                    region: data?.data?.data?.region || '',
                    country: data?.data?.data?.country || '',
                    postCode: data?.data?.data?.postCode || '',
                    contactNumber: data?.data?.data?.contactNumber || '',
                    id: data?.data?.data?.id || ''
                })
            }).catch(err => {
                navigate('/')
                alert(err.message || err || "Something went wrong geting the updated user")
            })
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setInputValues({...inputValues, [name]: value})
    }


    const checkDisabled = () => {
        const isEqual = Object.keys(inputValues).every(key => inputValues[key] === user[key])
        if (isEqual) {
            return true
        } else {
            return false
        }
    }


    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        dispatch(updateUser(inputValues,user.id))
            .then(data => {
                setLoading(false)
                getCurrentUser()
                setLoading(false)
                alert("User updated successfully")
                navigate('/')
            }).catch(err => alert(err.message || err || "Something went wrong updating the user"))
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
                <div className="navbar-title" data-testid="navbar-title">Edit User</div>
            </div>
            <form className='form-container' onSubmit={handleSubmit}>
                <label>
                    First Name: <input
                        type="text"
                        name="firstName"
                        required
                        data-testid="firstname-input"
                        value={inputValues.firstName}
                        onChange={handleChange} />
                </label>
                <label>
                    Last Name: <input
                        type="text"
                        name="lastName"
                        required
                        data-testid="lastname-input"
                        value={inputValues.lastName}
                        onChange={handleChange} />
                </label>
                <label>
                    Address One: <input
                        type="address"
                        name="address_1"
                        value={inputValues.address_1}
                        data-testid="address1-input"
                        onChange={handleChange} />
                </label>
                <label>
                    Address Two: <input
                        type="address"
                        name="address_2"
                        value={inputValues.address_2}
                        data-testid="address2-input"
                        onChange={handleChange} />
                </label>
                <label>
                    Town: <input
                        type="text"
                        name="town"
                        value={inputValues.town}
                        data-testid="town-input"
                        onChange={handleChange} />
                </label>
                <label>
                    Region: <input
                        type="text"
                        name="region"
                        data-testid="region-input"
                        value={inputValues.region}
                        onChange={handleChange} />
                </label>
                <label>
                    Country: <input
                        type="text"
                        name="country"
                        data-testid="country-input"
                        value={inputValues.country}
                        onChange={handleChange} />
                </label>
                <label>
                    PostCode: <input
                        type="text"
                        name="postCode"
                        data-testid="postcode-input"
                        value={inputValues.postCode}
                        onChange={handleChange} />
                </label>
                <label>
                    Contact Number: <input
                        type="text"
                        name="contactNumber"
                        data-testid="contact-number-input"
                        value={inputValues.contactNumber}
                        onChange={handleChange} />
                </label>
                <button className="submit-button red loading" disabled={checkDisabled()}>
                    {loading ? "Updating" : "Update User"}
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
                </button>
            </form>
        </div>
    )
}
