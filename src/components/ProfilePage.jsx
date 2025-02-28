import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Hook to get authenticated user
import axios from "axios";

export const ProfilePage = () => {
  const { user } = useUser(); // Get the authenticated user from Clerk
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch user data from the backend
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://rbuconnect-backend.onrender.com/api/users/${user.id}`
          );
          setUserData(response.data); // Set the user data
          setLoading(false); // Stop loading
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data");
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state
  }

  if (!userData) {
    return <div>No user data found</div>; // Handle case where no data is found
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-details">
        <div className="profile-section">
          <h2>Personal Details</h2>
          <p>
            <strong>Name:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Bio:</strong> {userData.bio || "Not provided"}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phoneNumber || "Not provided"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {userData.dateOfBirth
              ? new Date(userData.dateOfBirth).toLocaleDateString()
              : "Not provided"}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender || "Not provided"}
          </p>
        </div>

        <div className="profile-section">
          <h2>Educational Details</h2>
          <p>
            <strong>Degree:</strong> {userData.degree || "Not provided"}
          </p>
          <p>
            <strong>Major:</strong> {userData.major || "Not provided"}
          </p>
          <p>
            <strong>Current Status:</strong> {userData.currentStatus || "Not provided"}
          </p>
        </div>

        <div className="profile-section">
          <h2>Professional Details</h2>
          <p>
            <strong>Current Company:</strong> {userData.currentCompany || "Not provided"}
          </p>
          <p>
            <strong>Job Title:</strong> {userData.jobTitle || "Not provided"}
          </p>
          <p>
            <strong>Industry:</strong> {userData.industry || "Not provided"}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {userData.skills && userData.skills.length > 0
              ? userData.skills.join(", ")
              : "Not provided"}
          </p>
          <h3>Work Experience</h3>
          {userData.workExperience && userData.workExperience.length > 0 ? (
            userData.workExperience.map((exp, index) => (
              <div key={index} className="work-experience">
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Position:</strong> {exp.position}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </p>
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
              </div>
            ))
          ) : (
            <p>No work experience provided</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Additional Information</h2>
          <p>
            <strong>Interests:</strong>{" "}
            {userData.interests && userData.interests.length > 0
              ? userData.interests.join(", ")
              : "Not provided"}
          </p>
          <h3>Certifications</h3>
          {userData.certifications && userData.certifications.length > 0 ? (
            userData.certifications.map((cert, index) => (
              <div key={index} className="certification">
                <p>
                  <strong>Name:</strong> {cert.name}
                </p>
                <p>
                  <strong>Issuing Organization:</strong> {cert.issuingOrganization}
                </p>
                <p>
                  <strong>Issue Date:</strong>{" "}
                  {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expiration Date:</strong>{" "}
                  {cert.expirationDate
                    ? new Date(cert.expirationDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>No certifications provided</p>
          )}
          <h3>Projects</h3>
          {userData.projects && userData.projects.length > 0 ? (
            userData.projects.map((project, index) => (
              <div key={index} className="project">
                <p>
                  <strong>Title:</strong> {project.title}
                </p>
                <p>
                  <strong>Description:</strong> {project.description}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "Present"}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p>No projects provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

