import React from "react";
import "./Me.css";
import {
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const App: React.FC = () => {
  // Replace these with your actual links and information
  const links = {
    github: "https://github.com/javaisgoat",
    linkedin: "https://linkedin.com/in/AayushBatwara",
    substack: "https://substack.com/@aayushbatwara",
    instagram: "http://instagram.com/aayush._",
    twitter: "https://X.com/AayushBatwara",
  };

  return (
    <div className="container">
      <div className="content">
        <img
          src="/your-photo.jpeg" // Replace with your photo
          alt="Aayush"
          className="profile-image"
        />

        <h1>Aayush Batwara</h1>
        <h2>Software Developer</h2>

        <div className="bio">
          <p>
            Hello! I'm a passionate software developer with expertise in React,
            TypeScript, and Node.js. I love building user-friendly applications
            and recently quit a cushy bank tech job to pursue more interesting
            things in a startup!
          </p>
        </div>

        <div className="social-links">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href={links.substack} target="_blank" rel="noopener noreferrer">
            <SiSubstack />
          </a>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href={links.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
