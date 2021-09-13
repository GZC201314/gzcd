import React, {ChangeEvent, FC, useRef, useState} from 'react'
import axios from "axios";
import Button from "../Button/button";
import UploadList from './uploadList'

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    headers?: { [key: string]: any };
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

const Upload: FC<UploadProps> = (props) => {

    /**state  state部分**/
    const {
        action,
        onProgress,
        defaultFileList,
        beforeUpload,
        onSuccess,
        headers,
        onError,
        onChange,
        onRemove,
        ...restProps
    } = props

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

    /**effect  effect部分**/
    const fileInput = useRef<HTMLInputElement>(null)
    /**methods 方法部分**/
        //Partial 可以替换重复属性的值
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
            setFileList(prevList => {
                return prevList.map(file => {
                    if (file.uid === updateFile.uid) {
                        return {...file, ...updateObj}
                    } else {
                        return file
                    }
                })
            })
        }

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    function post(file: File) {
        let _file: UploadFile = {
            name: file.name,
            size: file.size,
            uid: Date.now() + 'Upload-file',
            status: 'ready',
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': 'https://www.test-cors.org'
            },
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentage);
                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    // setFileList((prevList)=>{
                    //     console.log(prevList)
                    //     return prevList;
                    // })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file, {status: 'success', response: resp.data})
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            console.error(err)
            updateFileList(_file, {status: 'error', error: err})
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
        console.log(fileList)
    }

    function uploadFiles(files: FileList) {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result === true) {
                    post(file)
                }
            }
        })
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        //上传完以后清空文件
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    /**render**/


    /**styles 样式部分**/


    function handleRemove(file: UploadFile) {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if(onRemove){
            onRemove(file)
        }
    }

    return (
        <div className='gzcd-upload-component'>
            <Button btnType='primary'
                    onClick={handleClick}
            >Upload File</Button>
            <input className={'gzcd-file-input'}
                   style={{display: "none"}}
                   ref={fileInput}
                   onChange={handleFileChange}
                   type={'file'}
            />
            <UploadList fileList={fileList} onRemove={handleRemove
            }/>
        </div>
    );
}
export default Upload
