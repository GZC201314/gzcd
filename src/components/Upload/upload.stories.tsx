import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Upload from "./upload";

const checkFileSize = (file:File) =>{
    if(Math.round(file.size/1024)>50){
        alert('file is too big')
        return false;
    }
    return true;
}

const filePromise = (file:File) =>{
    const newFile = new File([file],'new_name.docx',{type:file.type})
    return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return (
        <Upload
    action="http://localhost:8080/BookStoreManager_war/userAction!uploadHeadIcon.action"
    onChange={action('changed')}
    // beforeUpload={filePromise}
    // onProgress={action('progress')}
    // onSuccess={action('success')}
    // onError={action('error')}
    />
    )
}


storiesOf('Upload component', module).add('Upload', SimpleUpload)
