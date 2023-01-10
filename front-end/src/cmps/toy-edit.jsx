
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadToys, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { toyService } from "../services/toy.service.js"


export function ToyEdit({ editToy }) {

    const navigate = useNavigate()
    const animatedComponents = makeAnimated();

    const [editedToy, setEditedToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])


    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setEditedToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
            })
    }

    function handleChange({ target }) {
        console.log('editedToy:', editedToy)
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        console.log('value:', value)

        setEditedToy((prevToy) => {
            if (field === 'labels') {
                const idx = editedToy.labels.findIndex(label => label === value)
                console.log('idx:', idx)
                if (idx === -1) {
                    editedToy.labels.push(value)
                } else {
                    editedToy.labels.splice(idx, 1)
                }

                value = editedToy.labels
                console.log('value:', value)
            }
            return { ...prevToy, [field]: value }

        })
    }

    function handleSelectChange(pickedLabels) {
        const { value } = pickedLabels[pickedLabels.length - 1]
        console.log('pickedLabels:',pickedLabels)
        console.log('value:',value)

        setEditedToy((prevToy) => {
            console.log('prevToy:',prevToy)
            prevToy.labels.push(value)
            console.log('prevToy.labels:',prevToy.labels)
            return { ...prevToy, labels: prevToy.labels }

        })

    }

    function onEditToy(ev) {
        ev.preventDefault()
        navigate('/toy')
        editToy(editedToy)



    }

    function editToy(toyToSave) {
        saveToy(toyToSave)
            .then((savedToy) => {
                // userService.addActivity(savedToy, 'Edited')
                showSuccessMsg(`Toy edited (id: ${savedToy._id})`)
                loadToys()
                console.log('here');
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })

    }

    const labels = toyService.getLabels()

    // const labels = [
    //     { value: '', label: '---Labels---' },
    //     { value: 'on-wheels', label: 'On wheels' },
    //     { value: 'box-game', label: 'Box game' },
    //     { value: 'art', label: 'Art' },
    //     { value: 'baby', label: 'Baby' },
    //     { value: 'doll', label: 'Doll' },
    //     { value: 'puzzle', label: 'Puzzle' },
    //     { value: 'outdoor', label: 'Outdoor' },
    //     { value: 'battery-powered', label: 'Battery Powered' }
    // ]



    return <section className="add-toy">
        <div className="flex space-between">
            <h2 className="add-toy-title">Add new Toy</h2>
            <Link to="/toy"><span className="material-symbols-outlined icon">close</span></Link>

        </div>
        <form onSubmit={onEditToy} className="add-toy-form">
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={editedToy.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="labels">Labels : </label>
                <Select
                    isMulti
                    options={labels}
                    name="labels"
                    id="labels"
                    onChange={handleSelectChange}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                />
            </div>
            <div>
                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    value={editedToy.price}
                    onChange={handleChange}
                />
            </div>
            <div className="inStock-container">
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

    </section>
}