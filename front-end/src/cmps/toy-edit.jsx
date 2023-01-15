
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadToys, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyEdit({ editToy }) {

    const navigate = useNavigate()
    const animatedComponents = makeAnimated();

    const [editedToy, setEditedToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])


    async function loadToy() {

        const toy = await toyService.getById(toyId)
        try {
            setEditedToy(toy)
        } catch (err) {
            console.error('Had issues in toy details', err)
        }


        // toyService.getById(toyId)
        //     .then((toy) => setEditedToy(toy))
        //     .catch((err) => {
        //         console.log('Had issues in toy details', err)
        //     })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value

        setEditedToy((prevToy) => {
            return { ...prevToy, [field]: value }
        })
    }

    function handleSelectChange(pickedLabels) {
        setEditedToy((prevToy) => {
            prevToy.labels = pickedLabels.map(label => label.value)
            return { ...prevToy, labels: prevToy.labels }

        })

    }

    function onEditToy(ev) {
        ev.preventDefault()
        navigate('/toy')
        editToy(editedToy)
    }

    async function editToy(toyToSave) {
        if (!toyToSave.imgUrl) toyToSave.imgUrl = `${utilService.getRandomIntInclusive(1, 6)}.png`
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy edited (id: ${savedToy._id})`)
            loadToys()
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }


        // saveToy(toyToSave)
        //     .then((savedToy) => {
        //         // userService.addActivity(savedToy, 'Edited')
        //         showSuccessMsg(`Toy edited (id: ${savedToy._id})`)
        //         loadToys()
        //         console.log('here');
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot add toy')
        //     })

    }

    const labels = toyService.getLabels()



    return <section className="add-toy">
        <div className="flex space-between">
            <h2 className="add-toy-title">Add new Toy</h2>
            <Link to="/toy"><span className="material-symbols-outlined icon">close</span></Link>

        </div>
        <form onSubmit={onEditToy} className="add-toy-form">
            <div className="add-input-container">
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={editedToy.name}
                    onChange={handleChange}
                />
            </div>

            <div className="add-input-container">
                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    value={editedToy.price}
                    onChange={handleChange}
                />
            </div>

            <div className="add-input-container">
                <label htmlFor="labels">Labels : </label>
                <Select
                    isMulti
                    options={labels}
                    name="labels"
                    id="labels"
                    onChange={handleSelectChange}
                    // closeMenuOnSelect={false}
                    // components={animatedComponents}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '210px',
                            minHeight: '20px',
                            fontSize: '1rem',
                            margin: '0'
                        }),
                    }}
                />
            </div>

            <div className=" add-input-container inStock-container">
                <label htmlFor="inStock">inStock</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={editedToy.inStock}
                    onChange={handleChange}
                />
            </div>

            <button className="add-toy-btn">Save</button>

        </form>

    </section >
}