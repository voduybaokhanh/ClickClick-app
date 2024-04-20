import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance"; // Ensure that the path and filename are correct
import swal from 'sweetalert';

const Block = ({ saveUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-report.php');
            if (response.status) {
                // Update the state with fetched users and report counts
                const usersWithReportCount = response.data.map(user => {
                    const reportCount = user.reports.length;
                    return { ...user, reportCount };
                });
                setUsers(usersWithReportCount);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal("Oops!", "Something went wrong while fetching data", "error");
        }
    }

    const handleBlock = async (userId) => {
        swal({
            title: "Confirm Block User?",
            text: "Block this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.delete(`/block.php?userid=${userId}`);
                    if (response.status) {
                        swal('User blocked successfully');
                        // Update the state after successful blocking
                        setUsers(users.map(user => user.userId !== userId ? user : { ...user, blocked: true }));
                    } else {
                        swal('Failed to block user');
                    }
                } catch (error) {
                    console.error('Error blocking user:', error);
                    swal('Error blocking user');
                }
            }
        });
    }

    const handleUnblock = async (userId) => {
        swal({
            title: "Confirm Unblock User?",
            text: "Unblock this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.delete(`/unblock.php?userid=${userId}`);
                    if (response.status) {
                        swal('User unblocked successfully');
                        // Update the state after successful unblocking
                        setUsers(users.map(user => user.userId !== userId ? user : { ...user, blocked: false }));
                    } else {
                        swal('Failed to unblock user');
                    }
                } catch (error) {
                    console.error('Error unblocking user:', error);
                    swal('Error unblocking user');
                }
            }
        });
    }

    return (
        <div>
            <h1>List of Reported Users</h1>
            <button className="btn btn-primary" onClick={() => saveUser(null)}>Logout</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Reported Post Count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>
                                <img src={user.avatar} alt="Avatar" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                            </td>
                            <td>{user.reportCount}</td>
                            <td>
                                {user.blocked ? (
                                    <button className="btn btn-primary" onClick={() => handleUnblock(user.userId)}>Unblock</button>
                                ) : (
                                    <button className="btn btn-danger" onClick={() => handleBlock(user.userId)}>Block</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Block;
