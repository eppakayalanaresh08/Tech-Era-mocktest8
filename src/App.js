import {Switch, Route, Redirect} from 'react-router-dom'

import CoursesDetails from './components/CoursesDetails'

import NotFound from './components/NotFound'

import './App.css'

import Home from './components/Home'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CoursesDetails} />
    <Route exact path="/not-Found" component={NotFound} />
    <Redirect to="/not-Found" />
  </Switch>
)

export default App
