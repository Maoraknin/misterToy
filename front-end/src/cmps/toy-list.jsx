import { Link } from 'react-router-dom'

import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy }) {

    

    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy}
                  />

                <div className="preview-btn-container">
                    <span onClick={() => { onRemoveToy(toy) }} className="material-symbols-outlined icon">delete</span>
                    {/* <button onClick={() => { onRemoveToy(toy) }}>delete</button>
                    <button onClick={() => { onEditToy(toy) }}>edit</button> */}
                    <Link to={`/toy/edit/${toy._id}`} ><span className="material-symbols-outlined icon">edit_note</span></Link>
                    
                    <div>
                        <Link to={`/toy/${toy._id}`}>Details</Link>

                    </div>
                </div>

            </li>)}
    </ul>
}