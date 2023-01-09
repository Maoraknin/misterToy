
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { toyService } from '../services/toy.service.js'
// import { userService } from '../services/user.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { loadToys, saveToy, removeToy, setFilter } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyAdd } from '../cmps/toy-add.jsx'
// import { update } from '../store/user.action.js'


export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const [isAddOpen, setIsAddOpen] = useState(false)


    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function setFilterBy(filterBy) {
        setFilter(filterBy)
    }

    function onNavPage(val) {
        let newPage = filterBy.pageIdx + val
        if (newPage < 0) return
        let newFilter = { ...filterBy, pageIdx: newPage }
        setFilter(newFilter)
    }

    function onRemoveToy(toy) {
        // userService.addActivity(toy, 'Removed')
        removeToy(toy)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    function addToy(toyToSave){
        saveToy(toyToSave)
            .then((savedToy) => {
                // userService.addActivity(savedToy, 'Added')
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
                loadToys()
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })

    }

    function onEditToy(toy) {
        const name = prompt('New text?')
        const toyToSave = { ...toy, name }

        saveToy(toyToSave)
            .then((savedToy) => {
                // userService.addActivity(savedToy, 'Edited')
                showSuccessMsg(`Toy updated to price: $${savedToy.name}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }


    function onUpdateToy(toy) {

        const msg = toy.isDone ? 'Marked' : 'Unmarked'

        saveToy(toy)
            .then(() => {
                // userService.addActivity(toy, msg, true)
                // .then((user) => update(user))
            })
            .catch(err => {
                showErrorMsg('Cannot update toy', err)
            })

    }

    function onToggleAddToy(){
        setIsAddOpen(!isAddOpen)
    }

    return <section className="toy-index">
        <h1 className='toy-index-title'>My Toys:</h1>
        <main className='index-container'>
            <div className='toy-actions-container'>
                <ToyFilter setFilterBy={setFilterBy} />
                {/* <ToyFilter /> */}
                {/* <div className='flex justify-center'>
                    <button onClick={onAddToy} className="add-toy-btn">Add Toy</button>
                </div> */}
                <div className='add-toy-container'>
                <button onClick={onToggleAddToy} className={isAddOpen ? "add-toy-btn hidden" : "add-toy-btn"}>Add Toy</button>

                {isAddOpen && <ToyAdd addToy={addToy} onToggleAddToy={onToggleAddToy}/>}
                </div>
            </div>

            {/* <ToyList /> */}
            {isLoading ? <p>Loading...</p> : <div>{toys.length ? <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                onUpdateToy={onUpdateToy}
            /> : <h1>No toys to show</h1>}</div>
            }

            <div className="index-toy-nav">
                <a onClick={() => onNavPage(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Previous Book</a>
                <a onClick={() => onNavPage(1)}>Next Book
                <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
        </main>
    </section>
}

