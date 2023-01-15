import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {


  return <article>
    {/* <h4>Toy  <span onClick={onSetIsDone} className="material-symbols-outlined icon done-indicator">{ toy.isDone ? 'task_alt' : 'circle' }</span>  </h4> */}
    <Link to={`/toy/${toy._id}`}><div className='priview-img-container'>
     {toy.imgUrl ? <img className='priview-img' src={toy.imgUrl} /> : <h2>img unavailable</h2>}
    </div></Link>
    <Link to={`/toy/${toy._id}`}><h3 className="toy-name">{toy.name}</h3></Link>
    <p>{toy.labels.toString()}</p>
    <p>{toy.price}$</p>
    {/* <p>{utilService.timeSince(toy.createdAt)}</p> */}
    <p>{toy.inStock}</p>
  </article>
}

// {require(`../assets/img/toys/${toy.imgUrl}`)}