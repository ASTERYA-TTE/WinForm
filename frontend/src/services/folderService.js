import axios from 'axios';
const folderCreateUrl = '/folder/create'
const folderListUrl = '/folder/list'

class FolderService {


    async createFolder(params) {
        try {
            const response = await axios.post(folderCreateUrl, params)
            return {data:response.data, error:null};
        } catch ( error ) {
            return {error:error}
        }
    }

    async listFolders(params) {
        try {   
            const response = await axios.post(folderListUrl, params)
            return {data: response.data, error:null}
        } catch (error) {
            return {error:error}
        }
    }


}

export default FolderService = new FolderService();