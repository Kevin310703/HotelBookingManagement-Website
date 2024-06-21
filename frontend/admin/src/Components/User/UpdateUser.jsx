import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../../Redux/User/userActions';
import { Alert } from 'react-bootstrap';

const UpdateUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state) => state.userState);
    const { users, loading, error, userUpdateSuccess } = userState;

    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        address: '',
        identity: '',
        phone: '',
        roles: ['user']
    });

    useEffect(() => {
        if (users.length === 0) {
            dispatch(getUsers());
        } else {
            const user = users.find((u) => u.id === parseInt(id, 10));
            if (user) {
                setUserData({
                    fullName: user.fullName,
                    email: user.email,
                    address: user.address,
                    identity: user.identity,
                    phone: user.phone,
                    roles: user.roles.map((role) => role.name)
                });
            }
        }
    }, [dispatch, users, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, userData));
        if (userUpdateSuccess) {
            navigate('/users');
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4 text-center">Update User</h1>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {userUpdateSuccess && <Alert variant="success">User updated successfully!</Alert>}
                    <form onSubmit={handleUpdateUser}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userData.fullName}
                                onChange={handleInputChange}
                                name="fullName"
                                id="fullName"
                                placeholder="Full name"
                                required
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={userData.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                                placeholder="Email"
                                required
                            />
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userData.address}
                                onChange={handleInputChange}
                                name="address"
                                id="address"
                                placeholder="Address"
                                required
                            />
                            <label htmlFor="identity">Identity</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userData.identity}
                                onChange={handleInputChange}
                                name="identity"
                                id="identity"
                                placeholder="Identity"
                                required
                            />
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={userData.phone}
                                onChange={handleInputChange}
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                required
                            />
                        </div>
                        <button className="btn btn-block btn-outline-primary" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update User'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;