import { Box, Image, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import './ImageSquare.css'
import './Uploader.css'
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { MdOutlineCameraswitch } from "react-icons/md"
import axios from "axios";
import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import usePost from "../../hooks/usePost";

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

const ImageSquare = (props) => {

    const ReturnImageOrIcon = () => {
        if (props.image == null || props.image == undefined) {
            if (props.id === 0) return <Text className='uploader__text'>Dodaj zdjęcie</Text>
            return <FiCamera className='uploader__icon' />
        }
        else {
            return <>
                <Image className="uploader__img" alt={props.image.filename} src={
                    isValidUrl(props.image) ? props.image : URL.createObjectURL(props.image)}></Image>
                <div className="uploader__icons-container">
                    <FiTrash2 onClick={() => props.onDeleteClick(props.id)} />
                    <MdOutlineCameraswitch />
                </div>
            </>
        }
    }
    return (
        <Box color={'blue.900'} shadow={'md'} className={'uploader__uploaded-file-container'}>
            <ReturnImageOrIcon />
            <label htmlFor={props.inputId} className={'uploader__files-input-label'}></label>
        </Box>
    )
}


const UploadGrid = forwardRef((props, ref) => {
    const [files, setFiles] = useState([])
    const [formDataToPost, setFormDataToPost] = useState();
    const { response, isPosting, postData } = usePost('https://api.cloudinary.com/v1_1/dj16gqjts/image/upload', formDataToPost)


    useEffect(() => {
        if (props.value) {
            setFiles(props.value)
        }
    }, [props.value])

    useImperativeHandle(ref, () => ({
        async postFiles() {
            try {
                const updatedFiles = await Promise.all(
                    files.map(async (file) => {
                        if (typeof file === 'object') {
                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("upload_preset", "gtu733xq");
                            const res = await axios.post('https://api.cloudinary.com/v1_1/dj16gqjts/image/upload', formData)
                            const { url } = res.data;
                            return url;
                        }
                        return file
                    })
                )
                setFiles(updatedFiles);
                return updatedFiles
            } catch (error) {
                console.log(error)
            }
        }
    }))



    useEffect(() => {
    }, [files])


    const handleFilesChange = (event) => {
        if (files.length !== 0) {
            let newFiles = [...files]
            for (let file of event.target.files) {
                if (newFiles.length < 6)
                    newFiles.push(file)
            }
            setFiles(newFiles.reverse())
            return
        }
        setFiles([...event.target.files].reverse())
    }
    const handleDelete = async (index) => {
        let newFiles = [...files]
        if(isValidUrl(newFiles[index])){
            // const res = await axios.post('https://api.cloudinary.com/v1_1/dj16gqjts/image/destroy', {"public_id": newFiles[index].split('/').slice(-1), "api_key": "886367423267998"})
            // console.log(res);
        }
        newFiles.splice(index, 1)
        setFiles(newFiles)
    }



    return (
        <div {...props} className="uploader">
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={0} id={0} image={files[0]}></ImageSquare>
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={1} id={1} image={files[1]}></ImageSquare>
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={2} id={2} image={files[2]}></ImageSquare>
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={3} id={3} image={files[3]}></ImageSquare>
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={4} id={4} image={files[4]}></ImageSquare>
            <ImageSquare inputId={'files-input'} onDeleteClick={(index) => handleDelete(index)} key={5} id={5} image={files[5]}></ImageSquare>
            <input className={'uploader__files-input'} onChange={(e) => { handleFilesChange(e) }} id={'files-input'} accept={'image/*'} multiple type={'file'} />
        </div>
    )
})

export default UploadGrid