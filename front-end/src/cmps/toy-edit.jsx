
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadToys, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { toyService } from "../services/toy.service.js"


export function ToyEdit({ addToy, onToggleAddToy }) {

    const navigate = useNavigate()

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

    function onAddToy(ev) {
        ev.preventDefault()
        navigate('/toy')
        // onToggleAddToy()
        // if (editedToy.labels.length) editedToy.labels = editedToy.labels.split(',')
        addToy(editedToy)

        

    }

    function addToy(toyToSave){
        saveToy(toyToSave)
            .then((savedToy) => {
                // userService.addActivity(savedToy, 'Edited')
                showSuccessMsg(`Toy edited (id: ${savedToy._id})`)
                loadToys()
                // navigate('/toy')
                console.log('here');
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })

    }



    return <section className="add-toy">
        <div className="flex space-between">
            <h2 className="add-toy-title">Add new Toy</h2>
            <Link to="/toy"><span className="material-symbols-outlined icon">close</span></Link>
            
            {/* <span onClick={onToggleAddToy} className="material-symbols-outlined icon">close</span> */}
        </div>
        <form onSubmit={onAddToy} className="add-toy-form">
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
                <select name="labels" id="labels" onChange={handleChange}>
                    <option value="">--labels--</option>
                    <option value="on-wheels">On wheels</option>
                    <option value="box-game">Box game</option>
                    <option value="art">Art</option>
                    <option value="baby">Baby</option>
                    <option value="doll">Doll</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="battery-powered">Battery Powered</option>
                </select>
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
                    checked = {editedToy.inStock}
                    onChange={handleChange}
                />
            </div>
            {/* <Link to="/toy"  className="add-toy-btn">Add</Link> */}
            <button className="add-toy-btn">Save</button>

        </form>

    </section>
}