import React from 'react'

const Course = ({ courses }) => {
    console.log(courses.map(item => item.name))
    return (
        <div>
            {courses.map(({ id, name, parts }) => {
                return (
                    <div key={id}>
                        <Header name={name} />
                        <Content parts={parts} />
                        <Total parts={parts} />
                    </div>
                )
            })}
        </div>
    )
}

const Header = ({ name }) =>
(
    <h2>{name}</h2>
)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(({ id, name, exercises }) => {
                return (
                    <Part key={id} part={name} exercises={exercises} />
                );
            })}
        </div>
    )
}

const Part = ({ part, exercises }) =>
(
    <p>{part} {exercises}</p>
)

const Total = ({ parts }) => {
    const sum = parts.reduce((id, value) => id + value.exercises, 0);
    return (
        <h4>Total of {sum} exercises</h4>
    )
}

export default Course