import React from "react"
import './Uploader.css'
import ImageSquare from "./ImageSquare"
import { Box } from "@chakra-ui/react"

class Uploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = { filesArray: [] }
        this.handleFileInputChange = this.handleFileInputChange.bind(this)
        this.appendResponseToState = this.appendResponseToState.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.returnUploadedImages = this.returnUploadedImages.bind(this)
    }
    async handleFileInputChange(event) {
        const selectedFilesFromInput = event.target.files
        const selectedFiles = []
        for (let i = 0; i < selectedFilesFromInput.length; i++) {
            selectedFiles.push(selectedFilesFromInput[i])
        }
        const formData = new FormData()
        for (let file of selectedFiles) {
            formData.append('imagesToUpload', file)
        }
        try {
            const response = await fetch('http://localhost:7000/upload-images', { method: 'POST', body: formData })
            const responseJson = await response.json()
            this.appendResponseToState(responseJson)
            console.log(responseJson)
        }
        catch (error) {
            console.log(error)
        }
        console.log(this.state.filesArray)
        this.returnUploadedImages()
    }

    appendResponseToState(responseArray) {
        const arrayToSave = this.state.filesArray
        for (let obj of responseArray) {
            arrayToSave.push(obj)
        }
        this.setState({ filesArray: arrayToSave })
    }
    async handleDeleteClick(id){
        const newFilesArrayState = this.state.filesArray
        const imageToDelete = this.state.filesArray[id].destination
        newFilesArrayState.splice(id,1)
        const response = await fetch('http://localhost:7000/delete-image',{
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset=UTF-8"}, 
            body: JSON.stringify({imagePath: imageToDelete})})
        if(response.ok){
            this.setState({filesArray: newFilesArrayState})
        }
        
    }
    returnUploadedImages(){
        this.props.uploadedImages(this.state.filesArray)
    }
    render() {  
        const imagesData = this.state.filesArray
        const imageSquareArray = []
        for(let i=0;i<6;i++){
            imageSquareArray.push(<ImageSquare inputId={'files-input'} key={i} id={i} imageData={imagesData[i]} onDeleteClick={this.handleDeleteClick}/>)
        }
        return (
            <Box {...this.props} className="uploader">
                {imageSquareArray}
                <input className={'uploader__files-input'} onChange={this.handleFileInputChange} id={'files-input'} accept={'image/*'} multiple type={'file'} />
            </Box>
        )
    }
}

export default Uploader