import { Link } from 'react-router-dom'
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, user }) {



    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy}
                />

                {user && user.isAdmin && <div className="preview-btn-container">
                    <span onClick={() => { onRemoveToy(toy) }} className="material-symbols-outlined icon">delete</span>
                    <Link to={`/toy/edit/${toy._id}`} ><span className="material-symbols-outlined icon">edit_note</span></Link>
                </div>}

            </li>)}
    </ul>
}