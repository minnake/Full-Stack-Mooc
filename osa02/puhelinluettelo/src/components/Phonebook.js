import React from 'react'

const Phonebook = ({ persons }) => {
    // console.log(persons.map(item => item))
    return (
        <div>
            {persons.map(({ id, content, number }) => {
                return (
                    <p key={id}>
                        {content} {number}
                    </p>
                )
            })}
        </div>
    )
}

export default Phonebook