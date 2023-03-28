import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EachCourses from '../EachCourses'

import './index.css'

const apiHomeData = {
  isInitial: 'INITIAl',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
  isLoading: 'LOADING',
}

class Home extends Component {
  state = {statusApi: apiHomeData.isInitial, listsTech: []}

  componentDidMount() {
    this.getHomeMount()
  }

  getHomeMount = async () => {
    this.setState({statusApi: apiHomeData.isLoading})
    const urlMount = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }
    const fetchData = await fetch(urlMount, option)
    if (fetchData.ok === true) {
      const data = await fetchData.json()
      const updateData = data.courses.map(eachObject => ({
        id: eachObject.id,
        logoUrl: eachObject.logo_url,
        name: eachObject.name,
      }))
      this.setState({listsTech: updateData, statusApi: apiHomeData.isSuccess})
    } else {
      this.setState({statusApi: apiHomeData.isFailure})
    }
  }

  renderSwitchSuccess = () => {
    const {listsTech} = this.state
    return (
      <div className="container-cards">
        <h1 className="heading-Courses">Courses</h1>
        <ul className="lists-Courses">
          {listsTech.map(eachObject => (
            <EachCourses eachObjectList={eachObject} key={eachObject.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitchLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSwitchFailure = () => (
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
        onClick={this.getHomeMount}
      >
        Retry
      </button>
    </div>
  )

  renderHome = () => {
    const {statusApi} = this.state
    switch (statusApi) {
      case apiHomeData.isSuccess:
        return this.renderSwitchSuccess()
      case apiHomeData.isFailure:
        return this.renderSwitchFailure()
      case apiHomeData.isLoading:
        return this.renderSwitchLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        {this.renderHome()}
      </div>
    )
  }
}

export default Home
