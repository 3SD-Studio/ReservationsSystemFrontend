import { Link } from "react-router-dom";

import './MainPage.css'

/**
 * React component representing simple main page of website. 
 * 
 * @returns {JSX.Element} Main page component.
 */
export function MainPage() {
  return (
    <>
      <div className="main-page">
        <h1>Select room</h1>
        <Link to="/rooms">Select room</Link>
      </div>
      <div className="project-description">
        <h3>Project description</h3>
        <p>Website </p>
      </div>
    </>
  )
}
