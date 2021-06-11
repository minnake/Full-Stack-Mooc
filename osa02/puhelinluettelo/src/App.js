import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook'

/* - Estä lisäämästä jo olemassa olevaa nimeä puhelinluetteloon
- Hakukenttä
- Refaktoroi eriyttämällä komponentit (filtteröintilomake, uuden henkilön lisäävä lomake ja kaikki
  henkilöt renderöivä komponentti) */

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <p>
            name: <input
              value={newName}
              onChange={handlePersonChange} />
          </p>
          <p>number: <input
            value={newNumber}
            onChange={handleNumberChange} />
          </p>
          <p>
            <button type="submit">add</button>
          </p>
        </form>
      </div>
      <div>
        <h2>Search</h2>
        <p>
          <input />
        </p>
        <p>
        </p>
      </div>
      <div>
        <h2>Numbers</h2>
        <table>
          <Phonebook persons={persons} />
        </table>
      </div>
    </div>
  )
}

export default App
