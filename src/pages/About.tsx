import Wrapper from "../sections/Wrapper";
import { FaGithub } from "react-icons/fa";
import avatarImage from "../assets/camel.jpg";

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="avatar" className="profile-image" />
      <h1 className="profile-text">Hi I am Camel</h1>
      <h2 className="profile-text">The creator of this awesome pokedex</h2>
      <h4 className="profile-text">
        This project is create for Curriculum Vitae my
      </h4>
      <div className="profile-links">
        <a href="https://github.com/ngodochanh/pokedex" target="_blank">
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(About);
