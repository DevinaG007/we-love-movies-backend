const service = require("./movies.service");

async function list(req, res){
    const isShowing = req.query.is_showing;
    if (isShowing === true){
        let data = await service.listAllShowing();
        res.json({data})
    }
    else {
        let data = await service.list();
        res.json({data});
    }
}

module.exports = {
    list,
}