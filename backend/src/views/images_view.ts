import Image from '../models/Image'
require('dotenv').config()

let PORT = process.env["PORT"];
let HOST = process.env["HOST"];

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://${HOST}:${PORT}/uploads/${image.path}`
        };
    },
    renderMany(images: Image[]) {
       return images.map(image => this.render(image)); 
    }
};