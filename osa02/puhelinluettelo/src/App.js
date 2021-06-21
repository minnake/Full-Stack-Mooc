import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import personService from './services/phonebook'

/* 
- Estä lisäämästä jo olemassa olevaa nimeä puhelinluetteloon+lisää mahdollisuus korvata
vanha puhelinnumero uudella.
- Refaktoroi eriyttämällä komponentit (filtteröintilomake, uuden henkilön lisäävä lomake ja kaikki
  henkilöt renderöivä komponentti) .
- Delete-nappula jokaisen nimen jälkeen.
- ilmoitus, kun henkilö lisätään ja poistetaan sekä numeron muutos.
*/

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, persons]);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
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
        <p>
          filter shown with <input
            type="text"
            placeholder="name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </p>
      </div>
      <div>
        <h2>Numbers</h2>
        <table>
          <Phonebook filteredPersons={filteredPersons} />
        </table>
      </div>
    </div>
  )
}

export default App
