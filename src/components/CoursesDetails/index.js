import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const CoursesDetailsApi = {
  isInitial: 'INITIAl',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
  isLoading: 'LOADING',
}

class CoursesDetails extends Component {
  state = {apiStatusCourses: CoursesDetailsApi.isInitial, listApiObject: {}}

  componentDidMount() {
    this.getEachCourses()
  }

  getEachCourses = async () => {
    this.setState({apiStatusCourses: CoursesDetailsApi.isLoading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const urlCourses = `https://apis.ccbp.in/te/courses/${id}`
    const fetchData = await fetch(urlCourses)

    if (fetchData.ok === true) {
      const data = await fetchData.json()

      const updateData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      console.log(updateData)

      this.setState({
        listApiObject: updateData,
        apiStatusCourses: CoursesDetailsApi.isSuccess,
      })
    } else {
      this.setState({apiStatusCourses: CoursesDetailsApi.isFailure})
    }
  }

  renderApiSuccess = () => {
    const {listApiObject} = this.state

    const {imageUrl, description, name} = listApiObject
    return (
      <div className="card-container-Details">
        <img src={imageUrl} alt={name} className="image-Course" />
        <div className="heading-container">
          <h1 className="name-Element">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderApiLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderApiFailure = () => (
    <div className="container-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We Cannot seem to find the page you are looking for.</p>

      <button
        type="button"
        className="retry-button"
        onClick={this.getEachCourses}
      >
        Retry
      </button>
    </div>
  )

  renderCoursesDetailsApi = () => {
    const {apiStatusCourses} = this.state
    switch (apiStatusCourses) {
      case CoursesDetailsApi.isSuccess:
        return this.renderApiSuccess()
      case CoursesDetailsApi.isLoading:
        return this.renderApiLoading()
      case CoursesDetailsApi.isFailure:
        return this.renderApiFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-api-card">
          {this.renderCoursesDetailsApi()}
        </div>

        <p>hki</p>
      </div>
    )
  }
}

export default CoursesDetails
