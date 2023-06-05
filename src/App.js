import './App.css';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  return (
    <section className="App">
      <div>
        <img className='logo'></img>
         <h1>HELLO TASK</h1>
      </div>
      <div>
         <p className='main-text'>Ya no busques hoja y papel. Cuida el medio ambiente con HelloTask...</p>
         <button type='submit'><Link to='/ToAccess'>Empezar ahora</Link></button>
      </div>
    </section>
  );
}

export default App;
