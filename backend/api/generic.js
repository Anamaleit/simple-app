const mongoose = require('mongoose');
module.exports = (model,itemNameSingular)=>({
    getAll : async (req, res) => {
        const items = await model.find({}).sort({createdAt: -1})
        res.status(200).json(items)
    },
    getOne : async (req, res) => {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        const item = await model.findById(id)
        if (!item) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        res.status(200).json(item)
    },
    create : async (req, res) => {
        // add doc to db
        try { 
            const item = await model.create(req.body)
            res.status(200).json(item)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    delete : async (req, res) => {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        const item = await model.findOneAndDelete({_id: id})
        if (!item) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        res.status(200).json(item)
    },
    update : async (req, res) => {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        let item;
        try {
            item = await model.findOneAndUpdate({_id: id}, {
                ...req.body}, {new: true}
            )
        }
        catch (error){
            return res.status(400).json({error: error.message})
        }
        if (!item) {
            return res.status(404).json({error: "No "+itemNameSingular+" found"})
        }
        res.status(200).json(item)
    },
});