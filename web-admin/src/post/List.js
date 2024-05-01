import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import swal from 'sweetalert';

const List = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-report.php');
            if (response.status) {
               
                const sortedPosts = response.posts.sort((a, b) => new Date(b.TIME) - new Date(a.TIME));
                setPosts(sortedPosts);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            swal("Oops!", "Something went wrong while fetching data.", "error");
        }
    };
    
    const handleDelete = async (postId) => {
        swal({
            title: "Confirm Deletion?",
            text: "This action will permanently delete this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.delete(`/delete-post-admin.php?postid=${postId}`);
                    if (response.status) {
                        swal("Deletion Successful");
                        setPosts(posts.filter(post => post.ID !== postId));
                    } else {
                        swal("Deletion Failed");
                    }
                } catch (error) {
                    console.error("Error deleting post:", error);
                    swal("Error deleting data");
                }
            }
        });
    };

    const handleCancelReport = async (postId) => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get(`/cancel.php?postid=${postId}`);
            if (response.status) {
                swal("Report Cancellation Successful");
                setPosts(posts.filter(post => post.ID !== postId));
            } else {
                swal("Report Cancellation Failed");
            }
        } catch (error) {
            console.error("Error canceling report:", error);
            swal("Error canceling report");
        }
    };

    return (
        <div
            className="container"
            style={{
                backgroundColor: "purple",
                background: "linear-gradient(to bottom, #3B21B7, #8B64DA, #D195EE, #CECBD3)",
                height: "100vh",
                width:"100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                flexDirection: "column",
            }}
        >
            <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold", textAlign: "center" }}>Reported Posts List</h1>
            <div
                style={{
                    maxWidth: "100%",
                    overflowX: "auto",
                    background: "white",
                    padding: "20px",
                    borderRadius: "30px", // Rounder edges for a softer look
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // Subtle shadow for visual depth
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
                    <a href="/block2" className="btn btn-warning">Go to User Management</a>
                    <button className="btn btn-link" onClick={() => saveUser(null)}>Logout</button>
                </div>
                <table className="table" style={{ borderSpacing: "0 10px" }}> {/* Adds spacing between rows */}
                    <thead>
                        <tr>
                            <th style={{ padding: "30px" }}>ID</th>
                            <th style={{ padding: "30px" }}>Name</th>
                            <th style={{ padding: "30px" }}>Post Content</th>
                            <th style={{ padding: "30px" }}>Image</th>
                            <th style={{ padding: "30px" }}>Time</th>
                            <th style={{ padding: "30px" }}>Reason</th>
                            <th style={{ padding: "30px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item) => (
                            <tr key={item.ID} style={{ padding: "30px" }}>
                                <td style={{ padding: "30px" }}>{item.ID}</td>
                                <td style={{ padding: "30px" }}>{item.NAME}</td>
                                <td style={{ padding: "30px" }}>{item.CONTENT}</td>
                                <td style={{ padding: "30px" }}>
                                    <img src={item.IMAGE} alt="Post" className="img-thumbnail" style={{ width:"100%", height:150 }} />
                                </td>
                                <td style={{ padding: "30px" }}>{item.TIME}</td>
                                <td style={{ padding: "30px" }}>{item.REASON}</td>
                                <td style={{ padding: "30px" }}>
                                    <button className="btn btn-primary" onClick={() => handleCancelReport(item.ID)}>Cancel Report</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
