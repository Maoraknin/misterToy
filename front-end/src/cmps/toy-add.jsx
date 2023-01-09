
import { useEffect, useRef, useState } from "react"


import { toyService } from "../services/toy.service.js"


export function ToyAdd({ addToy, onToggleAddToy }) {

    const [addedToy, setAddedToy] = useState(toyService.getEmptyToy())



    function handleChange({ target }) {
        console.log('addedToy:', addedToy)
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value

        setAddedToy((prevToy) => {
            if (field === 'labels') {
                const idx = addedToy.labels.findIndex(label => label === value)
                console.log('idx:', idx)
                if (idx === -1) {
                    addedToy.labels.push(value)
                } else {
                    addedToy.labels.splice(idx, 1)
                }

                value = addedToy.labels
                console.log('value:', value)
            }
            return { ...prevToy, [field]: value }

        })
    }

    function onAddToy(ev) {
        ev.preventDefault()
        onToggleAddToy()
        // if (addedToy.labels.length) addedToy.labels = addedToy.labels.split(',')
        addToy(addedToy)

    }


    return <section className="add-toy">
        <div className="flex space-between">
            <h2 className="add-toy-title">Add new Toy</h2>
            <span onClick={onToggleAddToy} className="material-symbols-outlined icon">X</span>
            {/* <span onClick={onToggleAddToy} className="material-symbols-outlined icon">close</span> */}
        </div>
        <form onSubmit={onAddToy} className="add-toy-form">
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={addedToy.name}
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
                {/* <input type="text"
                    name="labels"
                    id="labels"
                    placeholder="Enter labels..."
                    value={addedToy.labels}
                    onChange={handleChange}
                /> */}
            </div>
            <div>
                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    value={addedToy.price}
                    onChange={handleChange}
                />
            </div>
            <div className="inStock-container">
                <label htmlFor="inStock">inStock</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    onChange={handleChange}
                />
            </div>
            <button className="add-toy-btn">Add</button>

        </form>

    </section>
}