import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../axios/useAxiosPrivate";

interface User {
    email: string;
    
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const axiosPrivate = useAxiosPrivate();

    // useEffect(() => {
    //     getUsers();
    // }, []); // Empty dependency array to execute only once when the component mounts

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/user/profile');
            console.log(response.data);
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = () => {
        getUsers();
    };

    return (
        <article>
            <button onClick={handleSubmit}>get user</button>
            <h2>Users List</h2>
            {users.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user.email}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
