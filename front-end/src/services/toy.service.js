
// import {storageService} from './async-storage.service.js'
import { httpService } from './http.service.js'


const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToysInStock,
    getFilteredToysByLabel,
    getLabels,
    getPriceMap
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&labels=${filterBy.labels}&inStock=${filterBy.inStock}&pageIdx=${filterBy.pageIdx}`
    return httpService.get(BASE_URL + queryParams)
}


function getById(toyId) {
    console.log(toyId);
    return httpService.get(BASE_URL + toyId)
    .then(toy => ({...toy, smsg:'Very good Product!!!'}))
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    console.log('toy:',toy)
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
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


  function getDefaultFilter() {
    return {  name: '', pageIdx:0, labels: '' }
  }

  function getToysInStock(){
    let filter = getDefaultFilter()
    filter.inStock = true
    return query(filter)

  }

  function getFilteredToysByLabel(toys){
    const labels = [
        { name: 'on-wheels', count: 0},
        { name: 'box-game', count: 0},
        { name: 'art', count: 0},
        { name: 'baby', count: 0},
        { name: 'doll', count: 0},
        { name: 'puzzle', count: 0},
        { name: 'outdoor', count: 0},
        { name: 'battery-powered', count: 0}
    ]


    toys.map(toy => {
        labels.map(label => {
            if(toy.labels.includes(label.name)) label.count++
        })
    })

    const countedLabels = []
    labels.map(label => countedLabels.push(label.count))
    return countedLabels

  }

  function getLabels() {
    return  [
        { value: '', label: '---Labels---' },
        { value: 'on-wheels', label: 'On wheels' },
        { value: 'box-game', label: 'Box game' },
        { value: 'art', label: 'Art' },
        { value: 'baby', label: 'Baby' },
        { value: 'doll', label: 'Doll' },
        { value: 'puzzle', label: 'Puzzle' },
        { value: 'outdoor', label: 'Outdoor' },
        { value: 'battery-powered', label: 'Battery Powered' }
    ]
  }



  function getPriceMap(toys){
    const priceMap = toys.reduce((acc, toy) => {
        if(toy.labels?.length) {
              toy.labels.map(label=>{
                if(!acc[label]) acc[label] = []
                acc[label].push(toy.price)
            })
        }
        console.log('acc:',acc)
        return acc
    }, {})
    console.log('priceMap:',priceMap)
  }


//   var x = {
//     "art": [23],
//     "wheels": [23,58,5],
//   }
