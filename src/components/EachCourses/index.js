import {Link} from 'react-router-dom'

import './index.css'

const EachCourses = props => {
  const {eachObjectList} = props
  const {name, logoUrl, id} = eachObjectList
  return (
    <Link to={`courses/${id}`} className="link-style">
      <li className="list-container">
        {/* <button type="button" className="button-courses" > */}
        <img src={logoUrl} alt={name} className="image-logo" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default EachCourses
