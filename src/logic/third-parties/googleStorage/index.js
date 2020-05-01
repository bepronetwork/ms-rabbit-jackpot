// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
import { generateRandomID } from '../../services/services';
import fs from 'fs';

class GoogleStorage{
    constructor(){
        this.storage = new Storage({keyFilename : "keys.json"});
    }

    // Creates the new bucket
    createBucket = async ({bucketName}) => {
        return await storage.createBucket(bucketName);
    }

    uploadFile = async ({bucketName, file}) => {
        let id = generateRandomID();
        let fileName = `${id}.jpg`
        fs.writeFileSync(fileName, `${file}`, 'base64');
        // Uploads a local file to the bucket
        await this.storage.bucket(bucketName).upload(`./${fileName}`, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
            },
        }); 
        // Makes the file public
        await this.storage
        .bucket(bucketName)
        .file(fileName)
        .makePublic();
        
        // Remove File
        fs.unlinkSync(`./${fileName}`)

        return `https://storage.googleapis.com/${bucketName}/${id}.jpg`;

    }
}


let GoogleStorageSingleton = new GoogleStorage();

export default GoogleStorageSingleton;