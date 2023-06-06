import './App.css';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  return (
    <section className="app">
      <div>
         <h1 className='title'><i class="bi bi-pen"></i> HELLOTASK</h1>
      </div>
      <div className='box-text'>
         <h3 className='main-text'>Ya no busques hoja y papel. Cuida el medio ambiente con HelloTask...</h3>
         <p className='phrase'>Somos tu agenda virtual totalmente gratuita</p>
         <button className='start_now' type='submit'><Link to='/ToAccess' style={{ textDecoration: 'none', color: 'white' }}>Empezar ahora</Link></button>
      </div>
    </section>
  );
}

export default App;
