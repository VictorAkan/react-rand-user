import React from 'react'
import { useState,useEffect } from "react"
import { FaCalendarTimes,FaEnvelopeOpen,FaUser,FaMap,FaPhone,FaLock } from "react-icons/fa"

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const Content = () => {
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState(null)
    const [title, setTitle] = useState('name')
    const [value, setValue] = useState('random person')
    const getPerson = async () => {
        setLoading(true)
        const response = await fetch(url)
        const data = response.json()
        console.log(data.results[0])   
        const person = data.results[0]
        const { phone,email } = person
        const { large:image } = person.picture
        const { password } = person.login
        const { first,last } = person.name
        const { dob:{ age }} = person
        const { street: { number,name }} = person.location
        const newPerson = {
            image,
            phone,
            email,
            password,
            age,
            name: `${first} ${last}`,
            street: `${number} ${name}`
        }
        setPerson(newPerson)
        setTitle('name')
        setValue(newPerson.name)
        setLoading(false)
    }
    useEffect(() => {
        getPerson()
    }, [])
    const handleValue = (e) => {
        e.preventDefault();
        if (e.target.classList.contains('icon')) {
            const newValue = e.target.dataset.label
            setTitle(newValue)
            setValue(person[newValue])
        }
    }
    return (
        <main>
            <div className="flex bg-gray-700 h-80 justify-center">
                <div className="block bg-white h-[28rem] md:w-1/2 w-3/4 mt-24 rounded-md drop-shadow-lg">
                    <div className="bg-slate-100 flex justify-center border-b-2 border-gray-300 h-32 rounded-t-md">
                        <img className="w-32 h-32 mt-10 rounded-full border-4 drop-shadow-lg ring-gray-900 border-slate-100" src={(person && person.image) || defaultImage} />
                    </div>
                    <div className="mt-20">
                        <p className="text-gray-700 text-lg">My {title} is</p>
                        <p className="mt-2 capitalize text-slate-800 text-4xl">{value}</p>
                    </div>
                    <div className="flex justify-center space-x-2 sm:space-x-5 md:space-x-20 text-3xl text-slate-500 p-9">
                        <button className='hover:text-blue-400' data-label="name" onMouseOver={handleValue}>
                            <FaUser />
                        </button>
                        <button className='hover:text-blue-400' data-label="email" onMouseOver={handleValue}>
                            <FaEnvelopeOpen />
                        </button>
                        <button className='hover:text-blue-400' data-label="age" onMouseOver={handleValue}>
                            <FaCalendarTimes />
                        </button>
                        <button className='hover:text-blue-400' data-label="street" onMouseOver={handleValue}>
                            <FaMap />
                        </button>
                        <button className='hover:text-blue-400' data-label="phone" onMouseOver={handleValue}>   
                            <FaPhone />
                        </button>
                        <button className='hover:text-blue-400' data-label="password" onMouseOver={handleValue}>
                            <FaLock />
                        </button>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="capitalize drop-shadow bg-sky-600 px-3 py-1 text-white rounded-md" onClick={getPerson}>
                            {loading ? 'loading...' : 'random user'}
                        </button>
                    </div>
                </div>  
            </div>
        </main>
    )
}

export default Content