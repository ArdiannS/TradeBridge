import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function EditComment(){
    const [message, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);

        // 👇️ this is the input field itself
        console.log(event.target);

        // 👇️ this is the new value of the input
        console.log(event.target.value);
    };

    const [commentData , setCommentData] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`/comments/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCommentData(data[0]);
            })
            .catch((error) => console.error(error));
    }, [id]);
    return (

        <div>
            <h1 className='text-2xl font-bold text-center'>Edit  info</h1>
            {commentData && (<form class="bg-white shadow-md rounded-lg mx-20 my-12 action={`/editComment/${commentData.commentId}`}" method="POST">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2" for="job_title">
                            commentContent:
                        </label>
                        <textarea
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="commentContent"
                            name="commentContent"
                            type="text"
                            defaultValue={ commentData.commentContent }
                            onChange={handleChange}
                            // value={message}

                        />

                    </div>

                    <div class="mb-4">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Edit
                        </button>

                    </div>
                </form>
            )}
        </div>

    )

}
export default EditComment;