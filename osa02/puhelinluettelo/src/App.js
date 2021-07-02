import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch(error => setError(error));
  }, []);

  useEffect(() => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, persons]);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: newName,
      name: newName,
      number: newNumber,
    }

    filteredPersons.forEach(person => {
      if (person.id === newName) {
        window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
        personService
          .update({ id: newName, newObject: personObject })
          .then(updated => {
            setPersons(persons.concat(updated))
            setNewName('')
            setNewNumber('')
          })
      }
      if (newName !== -1) {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      } else {
        console.log('Not updated')
      }
    })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterInput = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    // console.log(id)
    if (window.confirm(`Delete ${id} from phonebook?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          console.log(response);
          console.log("This data was deleted: " + response.data);

        })
    }
  }

  return (
    <div>
      <div>
        {error && <p>{error}</p>}
        <h2>Phonebook</h2>
        <form>
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
            <button type="submit" onClick={addPerson}>add</button>
          </p>
        </form>
      </div>
      <div>
        <p>
          filter shown with <input
            type="text"
            placeholder="name"
            onChange={filterInput}
          />
        </p>
      </div>
      <div>
        <h2>Numbers</h2>
        <table>
          <Phonebook filteredPersons={filteredPersons} handleDelete={handleDelete} />
        </table>
      </div>
    </div>
  )
}

export default App
