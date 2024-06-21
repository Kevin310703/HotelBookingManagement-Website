import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/User/userActions';
import Loading from '../Loading';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.userState);
    const { loading, users, error } = userState;

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Debugging output
    console.log('Loading:', loading);
    console.log('Users:', users);
    console.log('Error:', error);

    return (
        <>
            {loading ? (
                <Loading message={'Users data loading...'} />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    style={{ marginTop: '80px', width: '80%', margin: '80px auto' }}
                >
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Identity</th>
                            <th>Phone No.</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? users.map((item, index) => (
                            item && (
                                <tr key={index}>
                                    <td>{item.fullName || 'N/A'}</td>
                                    <td>{item.email || 'N/A'}</td>
                                    <td>{item.address || 'N/A'}</td>
                                    <td>{item.identity || 'N/A'}</td>
                                    <td>{item.phone || 'N/A'}</td>
                                    <td>{Array.isArray(item.roles) ? item.roles.map(role => role.name).join(', ') : 'N/A'}</td>
                                    <td>
                                        <Link to={`/updateUser/${item.id}`}>
                                            <Button variant="outline-primary" size="sm">Update</Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        )) : <tr><td colSpan="7">No users found</td></tr>}
                    </tbody>
                </Table>
            )}
        </>
    );
};

Users.propTypes = {
    userState: PropTypes.shape({
        loading: PropTypes.bool,
        users: PropTypes.arrayOf(PropTypes.shape({
            fullName: PropTypes.string,
            email: PropTypes.string,
            address: PropTypes.string,
            identity: PropTypes.string,
            phone: PropTypes.string,
            roles: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            }))
        })),
        error: PropTypes.string
    })
};

export default Users;