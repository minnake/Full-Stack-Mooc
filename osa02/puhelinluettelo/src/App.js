import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Notification from './services/Notification'
import personService from './services/phonebook'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch(error => setError(error));
  }, [search, persons]);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: newName,
      name: newName,
      number: newNumber,
    }

    const personToUpdate = persons.find(({ name }) => newName === name)

    if (personToUpdate) {
      window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      personService
        .update({ id: newName, newObject: personObject })
        .then(() => {
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(
            `Person '${newName}' was not added to phonebook`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    } else {
      personService
        .create(personObject)
        .then(() => {
          setNewName('')
          setNewNumber('')
        })
    }
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
        })
        .catch(error => {
          setError(
            `Person '${id}' was already removed from server`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    } 
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        {error && <p>{error}</p>}
        <h2>Phonebook</h2>
        <Notification error={error} />
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
