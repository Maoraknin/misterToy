import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import Select from 'react-select'
import { utilService } from "../services/util.service.js"



export function ToyFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    // const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

    const labels = toyService.getLabels()


    // setFilterBy = useRef(utilService.debounce(setFilterBy))

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleTypeChange({ target }) {
            const { value, name: field, type, checked } = target

            setFilterByToEdit((prevFilter) => {
                if (type === 'checkbox') return { ...prevFilter, [field]: checked }
                return ({ ...prevFilter, [field]: value })

            })

        }

        function handleSelectChange(target){
            const { value } = target
            console.log('filterByToEdit:',filterByToEdit)

            setFilterByToEdit((prevFilter) => {
                return ({ ...prevFilter, labels: [value] })
            })

        }



    return (<section className="toy-filter">
        <h2 className="filter-title"></h2>
        <input className="input-filter" type="text"
            name="name"
            placeholder="Enter Text"
            onChange={handleTypeChange}
        // value={filter.txt}
        />

        <label htmlFor="inStock">inStock</label>
        <input type="checkbox"
            id="inStock"
            name="inStock"
            onChange={handleTypeChange}
        />

        <label htmlFor="labels">Labels : </label>
        {/* <select name="labels" id="labels" onChange={handleTypeChange}>
            <option value="">--labels--</option>
            <option value="on-wheels">On wheels</option>
            <option value="box-game">Box game</option>
            <option value="art">Art</option>
            <option value="baby">Baby</option>
            <option value="doll">Doll</option>
            <option value="puzzle">Puzzle</option>
            <option value="outdoor">Outdoor</option>
            <option value="battery-powered">Battery Powered</option>
        </select> */}
        <Select
            options={labels}
            name="labels"
            id="labels"
            onChange={handleSelectChange}
        />

    </section>
    )
}