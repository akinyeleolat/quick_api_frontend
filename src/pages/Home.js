import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getAllUser, removeUser} from '../store/actions';


export default function Home(props) {
    const navigate = useNavigate()
    const userList = useSelector(state => state.app?.users)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const getUsersFromAPI = async () => {
        setLoading(true)
        dispatch(getAllUser())
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
        <div className="page-container">
            <div className='navbar-container'>
                <div className="navbar-title" data-testid="navbar-title">Home</div>
            </div>
            <div className='content-container'>
                {!loading ?
                    <>
                        {userList.map((user, index) => (
                            <div className="user-container" key={index?.toString()}>
                                <img src="/user_image.jpeg" alt="Avatar" className="user-avatar" />
                                <div className="user-name">{user.firstName} {user.lastName}</div>
                                <div className="buttons-container">
                                    <button className="button green" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="button red" onClick={() => handleDelete(user.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        < Link to="/create-user">
                            <div className='add-box-container' data-testid="add-user-btn" aria-label="add-user-btn">
                                <i className='fal fa-plus add-box-icon' />
                                <div className='add-box-text'>Add User</div>
                            </div>
                        </Link>
                    </> : <i className="fas fa-spinner fa-spin" />}
            </div>
        </div >
    )
}
