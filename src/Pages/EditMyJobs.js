import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function EditMyJobs() {
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    // submit form data with file
  }

  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);

    // 👇️ this is the input field itself
    // console.log(event.target);

    // 👇️ this is the new value of the input
    // console.log(event.target.value);
  };
  const [jobData, setJobData] = useState(null);

  const { id } = useParams();

  useEffect(() => {

    fetch(`/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      
        console.log('this is data', data)
        setJobData(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
  };
  return (
    <div>
      {jobData && (
        <form
          class="bg-white shadow-md rounded-lg mx-20 my-12 action={`/editjobs/${jobData.jobId}`}
          "
          method="post"
        >
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="job_title">
              Job Title
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_title"
              type="text"
              name="jobTitle"
              placeholder="Enter job title"
              defaultValue={jobData.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="job_type">
              Job Type
            </label>
            <select
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_type"
              name="jobType"
              defaultValue={jobData.jobType}
              onChange={handleChange}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
              <option>Contract</option>
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 font-medium mb-2"
              for="job_category"
            >
              Job Category
            </label>
            <select
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_category"
              name="jobCategory"
              defaultValue={jobData.jobCategory}
              onChange={handleChange}
            >
              <option>Select an option</option>
              <option>IT</option>
              <option>Pastrim</option>
              <option>Ndertimtari</option>
              <option>Mirembajtje</option>
              <option>Hidraulik</option>
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 font-medium mb-2"
              for="job_description"
            >
              Job Description
            </label>
            <textarea
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_description"
              placeholder="Enter job description"
              name="jobDescription"
              defaultValue={jobData.jobDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="job_city">
              Job City
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="job_city"
              type="text"
              placeholder="Enter job City"
              name="jobCity"
              defaultValue={jobData.jobCity}
              onChange={handleChange}
            />
          </div>
          {/* <div class="mb-4">
            <label>
              Job Photo:
              {file && <span>{file.name}</span>}
              <input type="file" name="jobPhoto" onChange={handleFileChange} />
            </label>
          </div> */}
          <div class="mb-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit Job
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditMyJobs;

