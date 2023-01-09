import { Link } from 'react-router-dom'

import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, onUpdateToy }) {

    

    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy}
                 onUpdateToy={onUpdateToy}
                  />

                <div className="preview-btn-container">
                    <span onClick={() => { onRemoveToy(toy) }} className="material-symbols-outlined icon">delete</span>
                    {/* <button onClick={() => { onRemoveToy(toy) }}>delete</button>
                    <button onClick={() => { onEditToy(toy) }}>edit</button> */}
                    <span onClick={() => { onEditToy(toy) }} className="material-symbols-outlined icon">edit_note</span>
                    <div>
                        <Link to={`/toy/${toy._id}`}>Details</Link>

                    </div>
                </div>

            </li>)}
    </ul>
}