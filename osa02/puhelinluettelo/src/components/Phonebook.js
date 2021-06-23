import React from 'react'

const Phonebook = ({ filteredPersons, handleDelete }) => {
    // console.log(filteredPersons.map(item => item))
    return (
        <tbody>
            {filteredPersons.map(({ id, name, number }) => {
                return (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{number}</td>
                        <td><button onClick={() => handleDelete(id)}>Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Phonebook