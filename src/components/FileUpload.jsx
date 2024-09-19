import React, { useState } from 'react';
import axios from '../api/axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission and file upload
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setUploadStatus('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus(response.data.message);
        } catch (error) {
            setUploadStatus('File upload failed');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default FileUpload;
