import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        toyService.getById(toyId)
            .then(toy => {
                console.log('toy:', toy)
                setToy(toy)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy', err)
            })
    }, [])


    return (
        <article>
            { toy ? <div>
            <p>{toy.name}</p>
            <p>{toy.price}$</p>
            <p>{toy.labels.toString()}</p>
            <p>{utilService.timeSince(toy.createdAt)}</p>
            <p>{toy.inStock}</p>
            <p>{toy.smsg}</p>
            </div> : <h2>Loading...</h2>}
            {/* <h4>Toy  <span onClick={onSetIsDone} className="material-symbols-outlined icon done-indicator">{ toy.isDone ? 'task_alt' : 'circle' }</span>  </h4> */}
            

            <Link to="/">Back to List</Link>
        </article>)
}
