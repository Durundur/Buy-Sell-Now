import React from "react";
import './ImageSquare.css'
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { MdOutlineCameraswitch } from "react-icons/md"

class ImageSquare extends React.Component{
    constructor(props){
        super(props)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }
    handleDeleteClick(){
       this.props.onDeleteClick(this.props.id)
    }
    returnImageOrIcon(){
        const imageData = this.props.imageData
        const id = this.props.id
        if (imageData == null ){
            if(id==0) return <span className='uploader__text'>Dodaj zdjęcie</span>
            return <FiCamera  className='uploader__icon'/>
        }
        else {
            return <>
              <img className="uploader__img" alt={imageData.filename} src={imageData.url}></img>
              <div className="uploader__icons-container">     
                <FiTrash2 onClick={this.handleDeleteClick}/>
                <MdOutlineCameraswitch onClick={this.handleRotateClick}/>
              </div>
            </>          
          }
    }
    render(){
        return(
            <span className={'uploader__uploaded-file-container'}>
                {this.returnImageOrIcon()}
                <label className={'uploader__files-input-label'} htmlFor={this.props.inputId}></label>
            </span>
        )
    }
}
export default ImageSquare