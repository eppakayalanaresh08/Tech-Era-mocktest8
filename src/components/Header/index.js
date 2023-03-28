import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="lists-nav">
    <button type="button" className="button-nav">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </Link>
    </button>
  </nav>
)

export default Header
