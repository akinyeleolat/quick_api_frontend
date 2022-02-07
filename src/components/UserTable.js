import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getAllUser, removeUser} from '../store/actions';


export default function UserTable({data, ...props}) {
    const navigate = useNavigate()
    const userList = useSelector(state => state.app?.users)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)


    const showTableHeading = () => {
        if (loading) {
            return <i className='fa fa-spinner fa-spin'></i>
        } else if (!loading && userList?.length === 0) {
            return "No Users Found"
        } else {
            return userList?.length + " Users"
        }
    }

    const getUsersFromAPI = async () => {
        setLoading(true)
        await dispatch(getAllUser())
        setLoading(false)
    }



    const handleDelete = (id) => {
        let shouldDelete = window.confirm('Are you sure you want to delete this user?')
        if (shouldDelete) {
            dispatch(removeUser(id))
                .then(data => getUsersFromAPI())
                .catch(err => alert(err.message || err || "Something went wrong deleting the user"))
        }
    }

    const handleEdit = (user) => {
        navigate('/edit-user', {state: {user}})
    }


    useEffect(() => {
        getUsersFromAPI()
    }, [])


    return (
        <>
            <div className="table-heading-container">
                <div className='table-heading'>User List</div>
                <div className=''>
                    {showTableHeading()}
                </div>
            </div>
            <div className='table-container'>
                <table data-testid="user-table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address 1</th>
                        <th>Address 2</th>
                        <th>Town</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Postcode</th>
                        <th>Contact Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map((user, index) => (
                        <tr key={index.toString()}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address_1}</td>
                            <td>{user.address_2}</td>
                            <td>{user.town}</td>
                            <td>{user.region}</td>
                            <td>{user.country}</td>
                            <td>{user.postCode}</td>
                            <td>{user.contactNumber}</td>
                            <div className='floating-actions'>
                                <i className="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                    onClick={() => handleEdit(user)}></i>
                                <i className="fa fa-trash red" aria-hidden="true" onClick={() => handleDelete(user)}></i>
                            </div>
                        </tr>
                    ))}
                    {userList.length === 0 ? <tr>
                        <td colSpan={8}>No Users Found</td>
                    </tr> : null}
                    </tbody>
                </table>
            </div>
            <Link to='/create-user' className='table-button'>
                <div>Create New User</div>
            </Link>
        </>
    )
}

