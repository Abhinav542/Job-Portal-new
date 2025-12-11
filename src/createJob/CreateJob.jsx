import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateJobCSS.css"
export default function CreateJob() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    salary: "",
    jobType: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get saved jobs from localStorage
    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // Create new job with unique id
    const newJob = {
      id: Date.now(),
      ...jobData
    };

    // Save back to localStorage
    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));

    alert("Job Request created successfully! After Verification Job Will be Post !");

    // Redirect to job listing page
    navigate("/jobs");
  };

  return (
    <div className="create-job-wrapper">
      <h1>Create New Job</h1>

      <form className="create-job-form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={jobData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Job Location"
          value={jobData.location}
          onChange={handleChange}
          required
        />

        <select
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          required
        >
          <option value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 yrs">0-1 yrs</option>
          <option value="1-3 yrs">1-3 yrs</option>
          <option value="3-5 yrs">3-5 yrs</option>
          <option value="5+ yrs">5+ yrs</option>
        </select>

        <input
          type="text"
          name="salary"
          placeholder="Salary (e.g. 4-7 LPA)"
          value={jobData.salary}
          onChange={handleChange}
          required
        />

        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit" className="create-btn">
          Create Job
        </button>
      </form>
    </div>
  );
}
