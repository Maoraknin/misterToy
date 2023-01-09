import { utilService } from "../services/util.service.js"

export function ToyPreview({toy}) {

  
        return <article>
          {/* <h4>Toy  <span onClick={onSetIsDone} className="material-symbols-outlined icon done-indicator">{ toy.isDone ? 'task_alt' : 'circle' }</span>  </h4> */}
          <p>{toy.name}</p>
          <p>{toy.price}$</p>
          <p>{toy.labels.toString()}</p>
          <p>{utilService.timeSince(toy.createdAt)}</p>
          <p>{toy.inStock}</p>
      </article>
  }
  