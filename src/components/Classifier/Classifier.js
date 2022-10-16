import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import {Spinner, Button, Alert, Image} from 'react-bootstrap'
import axios from 'axios'



class Classifier extends Component {
    state = {
        files: [],
        isLoading: false,
        recentImage: null,
    }

    activateSpinner = () => {  //30
        this.setState({
            files:[],
            isLoading:true,
           })
    }

    deactivateSpinner=()=> {
       this.setState({isLoading:false})
    }


    componentDidMount() {
        this.getImages()
    }

    getImages = () =>{
        axios.get("https://whatimage-django-back.herokuapp.com/api/images/",{
            headers: {
                "accept":"application/json"
            }
        }).then(resp=>{
            console.log(resp)
        })
    }

    sendImage =()=> {
        this.activateSpinner()
        let formData = new FormData()
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post("https://whatimage-django-back.herokuapp.com/api/images/", formData, {
            headers: {
               'accept': 'application/json',
               'content-type': 'multipart/form-data'
            }
        })
        .then(resp=>{
            this.getImageClass(resp)
            //console.log(resp)
            console.log(resp.data.id)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getImageClass =(obj)=> {
        console.log(obj.data.id)
        axios.get(`https://whatimage-django-back.herokuapp.com/api/images/${obj.data.id}/`, {
            headers: {
               'accept': 'application/json',
            }
        })
        .then(resp=>{
            this.setState({recentImage:resp})
            console.log(resp)
        })
        .catch(err=>{
           console.log(err)
       })
       this.deactivateSpinner()

    }

    onDrop =(files) =>{
        this.setState({
            files:[],
            isLoading: true,
            recentImage:null
            })
        this.loadImage(files)
    }

    loadImage=(files)=>{
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false
            }, ()=>{console.log(this.state.files)})
        }, 1000);
        
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        return (
            <>
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg, text/html'>
                {({ isDragActive, getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone back' })}>
                            <input {...getInputProps()} />
                            <i className="far fa-image mb-2 text-muted" style={{ fontSize: 100 }}></i>
                            <p className='text-muted'>{isDragActive ? "Drop some images " : "Drag 'n' drop some files here, or click to select files"}</p>
                        </div>
                        <aside>
                            {files}
                        </aside>

                        {this.state.files.length > 0 &&
                            <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>}

                        {this.state.isLoading &&
                            <Spinner animation="border" role="status"></Spinner>}

                        {this.state.recentImage &&
                            <React.Fragment>
                                <Alert variant='primary'>
                                    {this.state.recentImage.data.classified}
                                </Alert>
                                <Image className='justify-content-center' src={this.state.recentImage.data.picture} height='200' rounded />
                            </React.Fragment>}
                    </section>
                )}
            </Dropzone>

            <React.Fragment>
                <img src="https://raw.githubusercontent.com/DuongDiesel/imageUpload/main/00000001_001.png" width={250} height={250} alt='00000001_001' />
            </React.Fragment>


            
            </>
          
        );
    }
}
export default Classifier;