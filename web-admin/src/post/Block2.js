import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import swal from 'sweetalert';

const Block = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-user-reported.php');
            if (response.status) {
                setPosts(response.reported_users);
            } else {
                throw new Error(response.msg);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal("Oops!", "Something went wrong while fetching data", "error");
        }
    };

    const toggleBlockStatus = async (userid, currentStatus) => {
        const url = currentStatus ? '/unblock.php' : '/block.php';
        const actionText = currentStatus ? 'Unblock' : 'Block';
        const confirmationMessage = currentStatus ? 'Confirm Unblock?' : 'Confirm Block?';
        const successMessage = currentStatus ? 'Unblock Successful' : 'Block Successful';

        swal({
            title: confirmationMessage,
            text: currentStatus ? "Unblock user!" : "Block user in the system!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willToggle) => {
            if (willToggle) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.post(url, { userid });
                    if (response.status) {
                        swal(successMessage);
                        // Update the status of the user in `posts`
                        setPosts((prevPosts) => {
                            return prevPosts.map((item) => {
                                if (item.USERID === userid) {
                                    return { ...item, Available: currentStatus ? 1 : 0 };
                                }
                                return item;
                            }).sort((a, b) => a.Available - b.Available || a.USERID - b.USERID);
                        });
                    } else {
                        swal(`Failed to ${actionText} the user`);
                    }
                } catch (error) {
                    console.error(`Error ${actionText}ing user:`, error);
                    swal(`Error during ${actionText}`);
                }
            }
        });
    };

    return (
        <div
            className="container"
            style={{
                backgroundColor: "purple",
                background: "linear-gradient(to bottom, #3B21B7, #8B64DA, #D195EE, #CECBD3)",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold", textAlign: "center" }}>Reported Users List</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >

            </div>
            <div
                style={{
                    maxWidth: "100%",
                    overflowX: "auto",
                    background: "white",
                    padding: "20px",
                    borderRadius: "30px",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <a href="/" className="btn btn-warning">Go to Post Management</a>
                    <button className="btn btn-link" onClick={() => saveUser(null)}>Logout</button>
                </div>
                <table className="table" style={{ borderSpacing: "0 10px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "30px" }}>User ID</th>
                            <th style={{ padding: "30px" }}>Reported Post Count</th>
                            <th style={{ padding: "30px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={index} style={{ padding: "30px" }}>
                                <td style={{ padding: "30px" }}>{item.USERID}</td>
                                <td style={{ padding: "30px" }}>{item.reported_count}</td>
                                <td style={{ padding: "30px" }}>
                                    {item.Available === 0 ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => toggleBlockStatus(item.USERID, true)}
                                        >
                                            Unblock
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => toggleBlockStatus(item.USERID, false)}
                                        >
                                            Block
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Block;
