import DataUriParser from 'datauri/parser.js'
import path from 'path'


const getUriData = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.resumeOriginalName).toString();
    return parser.format(extName, file.buffer)
}


export default getUriData;