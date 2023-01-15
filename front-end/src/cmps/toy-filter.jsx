import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import Select from 'react-select'
import React from 'react';



export function ToyFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())


    const labels = toyService.getLabels()



    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleTypeChange({ target }) {
        const { value, name: field, type, checked } = target

        setFilterByToEdit((prevFilter) => {
            console.log(prevFilter);
            if (type === 'checkbox') return { ...prevFilter, [field]: checked }
            return ({ ...prevFilter, [field]: value })

        })

    }

    function handleSelectChange(target) {
        const { value } = target

        setFilterByToEdit((prevFilter) => {
            return ({ ...prevFilter, labels: [value] })
        })

    }



    return (<section className="toy-filter">
        <div>
            <h2 className="filter-title"></h2>
            <input className="input-filter" type="text"
                name="name"
                placeholder="Enter Text"
                onChange={handleTypeChange}
            />
        </div>

        <div className="flex bottom-filter-container">
            <div>
                <label htmlFor="inStock">inStock</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    onChange={handleTypeChange}
                />
            </div>
            <div className="label-filter-container">
                <label htmlFor="labels">Labels : </label>
                <Select
                    options={labels}
                    name="labels"
                    id="labels"
                    onChange={handleSelectChange}
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: '150px',
                          minHeight: '20px',
                          fontSize: '1rem'
                        }),
                      }}
                />
            </div>
        </div>

    </section>
    )
}