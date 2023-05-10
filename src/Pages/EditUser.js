import React,{useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom';

function EditUser() {
    const [message, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);
    
        // 👇️ this is the input field itself
        console.log(event.target);
    
        // 👇️ this is the new value of the input
        console.log(event.target.value);
      };

    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`/users/${id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserData(data[0]);
          })
          .catch((error) => console.error(error));
      }, [id]);

  return (

<div>
    <h1 className='text-2xl font-bold text-center'>Edit  info</h1>
  {userData && (<form class="bg-white shadow-md rounded-lg mx-20 my-12 action={`/edituser/${userData.userid}`}" method="POST">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="job_title">
          Username:
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            defaultValue={ userData.username }
            onChange={handleChange}
            // value={message}

            />

      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="Email">
        Email:
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            defaultValue={ userData.email }
            onChange={handleChange}
            // value={message}
            />

      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="Password">
        Password:
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            defaultValue={ userData.password }
            onChange={handleChange}
            // value={message}
            />           

      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="Birthday">
        Birthday:
        </label>
        <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthday"
            name="birthday"
            defaultValue={ userData.birthday }
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

export default EditUser