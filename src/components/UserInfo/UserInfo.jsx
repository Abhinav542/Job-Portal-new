// import React, { useEffect } from "react";
// import { useState } from "react";
// import "./userInfo.css"
// export default function UserInfo(){
//     const storedUser = JSON.parse(localStorage.getItem("user")) || null;
//     let [name , setName] = useState("XYZ");
//     let [url , setUrl] = useState("null");
//     let [email , setEmail] = useState("null");

//     // Personal Details
//     let [phone , setPhone] = useState("null");
//     let [address , setAddress] = useState("null");
//     let [gender , setGender] = useState("null");

//     useEffect(()=>{
//         if(storedUser){
//             setName(storedUser.name);
//         setEmail(storedUser.email);
//         }
//     },[storedUser])

//     // console.log(phone);
//     return (
//         <div className="body">
//             <div>
//                 <img className="profile_img"src="../../../public/images/userImg.png" alt="Profile Image" />
//                 <h2>{name}</h2>
//                 <h3>{email}</h3>
//             </div>
//             <form onSubmit={(e)=>e.preventDefault()}>
//                 <h3>Personal Details -</h3>
//                 <label htmlFor="phone" >Phone No. : </label>
//                 <input id="phone" type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your nuber"/>
//                 {/* Address */}
//                 <br />
//                 <label htmlFor="address" >Address : </label>
//                 <input id="address" type="text" value={address} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your address"/>


//                 <br />

//                 <label htmlFor="gender" >Gender : </label>
//                 <select name="gender" id="gender">
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="others">Others</option>
//                 </select>
//             </form>
//         </div>
//     )
// }
import React, { useEffect, useState, useRef } from "react";
import "./userInfo.css";

export default function UserInfo() {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    const savedData = JSON.parse(localStorage.getItem("candidateInfo")) || {};

    // Basic Info
    const [name, setName] = useState("XYZ");
    const [email, setEmail] = useState("null");

    // Personal Details
    const [phone, setPhone] = useState(savedData.phone || "");
    const [address, setAddress] = useState(savedData.address || "");
    const [gender, setGender] = useState(savedData.gender || "");
    const [dob, setDob] = useState(savedData.dob || "");

    // Candidate Info
    const [skills, setSkills] = useState(savedData.skills || "");
    const [experience, setExperience] = useState(savedData.experience || "");
    const [qualification, setQualification] = useState(savedData.qualification || "");
    const [resume, setResume] = useState(savedData.resume || "");
    const [portfolio, setPortfolio] = useState(savedData.portfolio || "");
    const [bio, setBio] = useState(savedData.bio || "");

    // Profile Img
    const [profileImg, setProfileImg] = useState(savedData.profileImg || "/images/userImg.png");

    // Ref for hidden file input
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (storedUser) {
            setName(storedUser.name);
            setEmail(storedUser.email);
        }
    }, [storedUser]);

    const handleImageClick = () => {
        fileInputRef.current.click(); // Open file picker
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImg(imageUrl);
        } else {
            alert("Please select a valid image file.");
        }
    };

    // SAVE FUNCTION
    const saveDetails = () => {
        const data = {
            phone,
            address,
            gender,
            dob,
            skills,
            experience,
            qualification,
            resume,
            portfolio,
            bio,
            profileImg
        };

        localStorage.setItem("candidateInfo", JSON.stringify(data));
        alert("✔ Details saved successfully!");
    };

    return (
        <div className="full_body">
        <div className="body">
            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                <img
                    className="profile_img"
                    src={profileImg}
                    alt="Profile"
                />
                <h2>{name}</h2>
                <h3>{email}</h3>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <h3>Personal Details</h3>

                <label htmlFor="phone">Phone No:</label>
                <input
                    id="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your number"
                />

                <br />
                <label htmlFor="address">Address:</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                />

                <br />
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <br />
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />

                <h3>Candidate Information</h3>

                <label htmlFor="skills">Skills:</label>
                <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. JavaScript, React, Node"
                />

                <br />
                <label htmlFor="experience">Experience (Years):</label>
                <input
                    id="experience"
                    type="number"
                    min={0}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="2"
                />

                <br />
                <label htmlFor="qualification">Qualification:</label>
                <input
                    id="qualification"
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="B.Tech / BCA / MCA"
                />

                <br />
                <label htmlFor="resume">Resume URL:</label>
                <input
                    id="resume"
                    type="text"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Google Drive / link"
                />

                <br />
                <label htmlFor="portfolio">Portfolio / GitHub:</label>
                <input
                    id="portfolio"
                    type="text"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://github.com/username"
                />

                <br />
                <label htmlFor="bio">About Me:</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Write something about yourself..."
                    rows="3"
                ></textarea>

                <br /><br />
                <button className="saveBtn" onClick={saveDetails}>
                    Save Details
                </button>
            </form>
        </div>
        </div>
    );
}
