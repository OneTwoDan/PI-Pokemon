const { Router } = require('express');
const router = Router();
const {getOrCreateTypes} = require('../aux_functions/pokemonFunctions')


router.get('/', async (req, res, next)=>{
    try {
        const types = await getOrCreateTypes()

        return res.json(types)
    }
    catch(e){
        next(e)
    }
});

module.exports = router;