import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const url = "https://65450cfe5a0b4b04436d8a44.mockapi.io/api/v1/students/";
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputOcuppation, setInputOcuppation] = useState("");

  
  const handleName = (event) => {
    setInputName(event.target.value);
  }
  const handlePhone = (event) => {
    setInputPhone(event.target.value);
  }
  const handleOcuppation = (event) => {
    setInputOcuppation(event.target.value);
  }

  const handleAddStudent = (event) => {
      event.preventDefault();
      if(!inputName | !inputPhone || !inputOcuppation) {
        alert("Debe completar todos los campos");
        return;
      }
      
      //console.log(JSON.stringify({ name: inputName, phone: inputPhone, ocuppation: inputOcuppation }));
      
      fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({ name: inputName, phone: inputPhone, ocuppation: inputOcuppation }),
          headers: {'content-type':'application/json'},
        }
      )
      .then(resp => resp.json())
      .then((data) => {
        //console.log(data)
        setInputName("");
        setInputPhone("");
        setInputOcuppation("");
        setLoading(prev => !prev)
        alert("Se agregó un estudiante con éxito!")
      })
      
  }

  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setStudent(data);
      })
      .finally(() => setLoading(false))
  },[loading])

  return (
    <section className='section'>
      <h1 className='title'>LISTADO DE ALUMNOS</h1>

      <form className='new-student'>
        <label htmlFor="name">Nombre: </label>
        <input type="text" value={inputName} onChange={handleName} />
        <label htmlFor="phone">Teléfono: </label>
        <input type="text" value={inputPhone} onChange={handlePhone} />
        <label htmlFor="ocuppation">Profesión: </label>
        <input type="text" value={inputOcuppation} onChange={handleOcuppation} />
        <button className='button' onClick={handleAddStudent}>Agregar</button>
      </form>

      <div className='sub-title'>
        <img src="" alt="" />
        <p>Name</p>
        <p>Phone</p>
        <p>Ocuppation</p>
      </div>
        {
          student &&
          student.map((stu) => {
            return (
            <div key={stu.id} className='student'>
              <img src={stu.image} alt={stu.name} />
              <p>{stu.id} - {stu.name}</p>
              <p>{stu.phone}</p>
              <p>{stu.ocuppation}</p>
            </div>
            )
          })
        }
    </section>
  )
}

export default App
