const fs = require('fs')
const {
    storageModel
} = require('../models');
const {
    matchedData
} = require('express-validator');
const {
    handleHttpError
} = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({
            data
        })
    } catch (error) {
        handleHttpError(res, 'ERRO_LIST_ITEMS')
    }

}
const getItem = async (req, res) => {
    try {
        const {
            id
        } = matchedData(req)
        const data = await storageModel.findById(id)
        res.send({
            data
        })
    } catch (error) {
        handleHttpError(res, 'ERRO_DETAIL_ITEMS')
    }

}

const createtItem = async (req, res) => {
    try {
        const {
            body,
            file
        } = req
        //console.log(file)
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({
            data
        })
    } catch (error) {
        handleHttpError(res, "ERROR_DETAIL_ITEMS");
    }
}

const updateItem = async (req, res) => {

}

const deleteItem = async (req, res) => {
    try {
        const {
            id
        } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        const deleteResponse = await storageModel.delete({
            _id: id
        });
        const {
            filename
        } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO c:/miproyecto/file-1232.png

        // fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: deleteResponse.matchedCount,
        };

        res.send({
            data
        });
    } catch (e) {
        handleHttpError(res, "ERROR_DETAIL_ITEMS");
    }
}

module.exports = {
    getItems,
    getItem,
    createtItem,
    updateItem,
    deleteItem
}