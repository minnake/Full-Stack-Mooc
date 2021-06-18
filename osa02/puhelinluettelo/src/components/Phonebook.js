import React from 'react'

const Phonebook = ({ filteredPersons }) => {
    // console.log(persons.map(item => item))
    return (
        <tbody>
            {filteredPersons.map(({ id, name, number }) => {
                return (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{number}</td>
                        <td><button>Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Phonebook