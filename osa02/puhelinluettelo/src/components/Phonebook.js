import React from 'react'

const Phonebook = ({ persons }) => {
    // console.log(persons.map(item => item))
    return (
        <tbody>
            {persons.map(({ id, name, number }) => {
                return (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{number}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Phonebook