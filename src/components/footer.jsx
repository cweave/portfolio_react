import React from "react"
import  { ReactComponent as Books }  from "../assets/books.svg"
import  { ReactComponent as Codepen }  from "../assets/codepen.svg"
import  { ReactComponent as Email }  from "../assets/email.svg"
import  { ReactComponent as Github }  from "../assets/github.svg"
import  { ReactComponent as Linkedin }  from "../assets/linkedin.svg"

const Footer = () => {
  return (
    <footer id="contact">
      <p>Christa Weaver © {new Date().getFullYear()}</p>

      <ul className="social-links">
        <li>
          <a href="https://github.com/cweave" rel="noreferrer noopener" target="_blank" title="Check out Christa's Github repositories">
            <Github title="Github logo - View Christa's Github projects" />
          </a>
        </li>
        <li>
          <a href="https://codepen.io/cweave" rel="noreferrer noopener" target="_blank" title="Follow Christa on CodePen">
            <Codepen title="Codepen logo - View Christa's Codepen projects" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/weaverchrista/" rel="noreferrer noopener" target="_blank" title="Connect with Christa on LinkedIn">
            <Linkedin title="LinkedIn logo - Connect with Christa on LinkedIn" />
          </a>
        </li>
        <li>
          <a href="https://app.thestorygraph.com/profile/cweave" rel="noreferrer noopener" target="_blank" title="Follow Christa on The StoryGraph">
            <Books title="Stack of books - Follow Christa on The StoryGraph" />
          </a>
        </li>
        <li>
          <a href="mailto:cweav3r@gmail.com" className="email" title="Send an email to Christa!">
            <Email />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer