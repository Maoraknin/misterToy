

import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"


export function ToySort({ onSetSort }) {

    const [currSort, setCurrSort] = useState(toyService.getDefaultSort())

    useEffect(() => {
        onSetSort(currSort)
    }, [currSort])

    function setSort(newSort) {
        const change = newSort === currSort.value ? -currSort.change : 1
        const sortBy = {
            value: newSort,
            change
        }
        setCurrSort(sortBy)
    }

    return <section className="sort-container">
        <button className="btn-sort" onClick={() => {setSort('name')}}>Name</button>
        <button className="btn-sort" onClick={() => {setSort('createdAt')}}>Created</button>
        <button className="btn-sort" onClick={() => {setSort('price')}}>Price</button>

    </section>
}