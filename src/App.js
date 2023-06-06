import './App.css';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  return (
    <section className="app">
      <div>
        <img className='logo'></img>
         <h1 className='title'>HELLOTASK</h1>
      </div>
      <div className='box-text'>
         <p className='main-text'>Ya no busques hoja y papel. Cuida el medio ambiente con HelloTask...</p>
         <button className='start_now' type='submit'><Link to='/ToAccess' style={{ textDecoration: 'none', color: 'white' }}>Empezar ahora</Link></button>
      </div>
    </section>
  );
}

export default App;
