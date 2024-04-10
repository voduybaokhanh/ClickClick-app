import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/Axiostance";

const List = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await (await AxiosInstance()).get("/get-all-posts.php")
            console.log(result);
            setPosts(result);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Post List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Content</th>
                        <th>Available</th>
                        <th>Image</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.length > 0 && posts.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user_id}</td>
                                <td>{item.content}</td>
                                <td>{item.available}</td>
                                <td>{item.image}</td>
                                <td>{item.time}</td>
                                <td>
                                    <a className="btn btn-primary">Look</a>
                                    <button className="btn btn-danger">Xoa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default List;