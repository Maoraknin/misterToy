
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
    getPriceMap,
    getDefaultSort,
    addToyMsg,
    removeToyMsg,
    addToyReview,
    removeToyReview
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    const queryParams = `?name=${filterBy.name}&labels=${filterBy.labels}&inStock=${filterBy.inStock}&pageIdx=${filterBy.pageIdx}&sortByVal=${sortBy.value}&sortByChange=${sortBy.change}`
    return httpService.get(BASE_URL + queryParams)
    // return httpService.get(BASE_URL + { params: { filterBy } })
}


async function getById(toyId) {
    try {
        const toy = await httpService.get(BASE_URL + toyId)
        return { ...toy, smsg: 'Very good Product!!!' }
    } catch (err) {
        throw new Error('cant get toy', err)
    }
}


function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}


function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
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

async function addToyMsg(toyId, txt) {
    try {
        const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
        return savedMsg
    }
    catch (err) {
        console.log('couldnt add toy msg:', err)
    }
}

async function addToyReview(toyId, review) {
    console.log('review:',review)
    try {
        const savedReview = await httpService.post(`toy/${toyId}/review`, review)
        return savedReview
    }
    catch (err) {
        console.log('couldnt add toy msg:', err)
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const savedMsg = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
        return savedMsg
    }
    catch (err) {
        console.log('couldnt remove toy msg:', err)
    }
}
      
async function removeToyReview(toyId, reviewId) {
    try {
        const savedReview = await httpService.delete(`toy/${toyId}/review/${reviewId}`)
        return savedReview
    }
    catch (err) {
        console.log('couldnt remove toy review:', err)
    }
}
  
    





function getDefaultFilter() {
    return { name: '', pageIdx: 0, labels: '' }
}

function getDefaultSort() {
    return { value: 'name', change: 1 }
}

function getToysInStock() {
    let filter = getDefaultFilter()
    filter.inStock = true
    return query(filter)

}

function getFilteredToysByLabel(toys) {
    const labels = [
        { name: 'on-wheels', count: 0 },
        { name: 'box-game', count: 0 },
        { name: 'art', count: 0 },
        { name: 'baby', count: 0 },
        { name: 'doll', count: 0 },
        { name: 'puzzle', count: 0 },
        { name: 'outdoor', count: 0 },
        { name: 'battery-powered', count: 0 }
    ]


    toys.map(toy => {
        labels.map(label => {
            if (toy.labels.includes(label.name)) label.count++
        })
    })

    const countedLabels = []
    labels.map(label => countedLabels.push(label.count))
    return countedLabels

}

function getLabels() {
    return [
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



function getPriceMap(toys) {
    const priceMap = toys.reduce((acc, toy) => {
        if (toy.labels?.length) {
            toy.labels.map(label => {
                if (!acc[label]) acc[label] = []
                acc[label].push(toy.price)
            })
        }
        return acc
    }, {})
    return priceMap
}

