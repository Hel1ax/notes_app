import HomeWrapper from 'components/HomeWrapper';
import Home from 'pages/Home';
import SignInPage from 'pages/SignIn';
import SignUpPage from 'pages/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWrapper><Home/></HomeWrapper>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
