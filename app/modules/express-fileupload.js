const path = require("path");
const { createUploadPath } = require("./functions");


const uploadFile = async (req, res, next) => {
    try {
        if(req.file || Object.keys(req.files).length == 0) throw {status : 400, message : 'please select a project image.'}
        let image = req.files.image
        let type = path.extname(image.name);

        if(![".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(type)) throw {status : 400, message : "this image format doesn't supported"}
       
        const image_path =  path.join(createUploadPath(), (Date.now() + type))
        req.body.image = image_path.substring(7)
        let uploadPath = path.join(__dirname, "..", "..", image_path);

        image.mv(uploadPath, (err) => {
            if(err) throw {status : 500, message : "a problem occurred will trying to upload project image."}
            next();
    })

    } catch (error) {
        next(error)
    }
}
module.exports = {
    uploadFile
}