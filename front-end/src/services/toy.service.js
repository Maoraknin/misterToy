
import {storageService} from './async-storage.service.js'
// import {utilService} from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const PAGE_SIZE = 2

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY)
    .then(toys =>{
        let filteredToys = toys

        if(filterBy.inStock){
            filteredToys = filteredToys.filter(toy => toy.inStock)
        } 
        if(filterBy.labels !== ''){
            filteredToys = filteredToys.filter(toy => toy.labels.includes(filterBy.labels))
        }
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            filteredToys = filteredToys.filter(toy => regex.test(toy.name))
        }
        if (filterBy.pageIdx !== undefined) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            filteredToys = filteredToys.slice(startIdx, PAGE_SIZE + startIdx)
        }

        return filteredToys

    } )
}
function getById(toyId) {
    console.log(toyId);
    return storageService.get(STORAGE_KEY, toyId)
    .then(toy => ({...toy, smsg:'Very good Product!!!'}))
}
function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    console.log('toy:',toy)
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

// function getReadPercent(){
//     return storageService.query(STORAGE_KEY)
//       .then(toys => {
//         const newToys = toys.filter(toy => toy.isDone)
//         return Math.ceil((newToys.length / toys.length) * 100)
//       })
//   }

  function getDefaultFilter() {
    return {  name: '', pageIdx:0, labels: '' }
  }
