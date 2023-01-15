const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const PAGE_SIZE = 4

async function query(filterBy) {
    try {

        const criteria = setCriteria(filterBy)

        const collection = await dbService.getCollection('toy')
        let toys = await collection.find(criteria).toArray()

        if (filterBy.pageIdx !== undefined) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            toys = toys.slice(startIdx, PAGE_SIZE + startIdx)
        }

        if(filterBy.sortByVal){
            if(filterBy.sortByVal === 'name') toys.sort((a, b) => a.name.localeCompare(b.name) * filterBy.sortByChange)
            if(filterBy.sortByVal === 'price') toys.sort((a, b) => (a.price - b.price) * filterBy.sortByChange)
            if(filterBy.sortByVal === 'createdAt') toys.sort((a, b) => (a.createdAt - b.createdAt) * filterBy.sortByChange)

        }



        console.log('criteria:', criteria)

        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}


function setCriteria(filterBy){
    const criteria = {}
    if(filterBy.name){
         criteria.name = { $regex: filterBy.name, $options: 'i' }
            // pageIdx: +filterBy.pageIdx
        
    }
    if(filterBy.inStock === 'true') criteria.inStock = true
    if(!filterBy.labels) return criteria
    criteria.labels = filterBy.labels
    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name : toy.name,
            price: toy.price,
            labels : toy.labels,
            inStock : toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function addToyReview(toyId, review) {
    try {
        // review.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { reviews: review } })
        return review
    } catch (err) {
        logger.error(`cannot add toy review ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyReview(toyId, reviewId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { reviews: {_id: reviewId} } })
        return reviewId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
    addToyReview,
    removeToyReview
}
