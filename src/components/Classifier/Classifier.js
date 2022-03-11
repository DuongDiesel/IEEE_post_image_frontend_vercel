import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'

class Classifier extends Component {
    state = {
        files: [],
        isLoading: false,
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

    onDrop =(files) =>{
        this.setState({
            //files:[],
            isLoading: true,
            //recentImage:null
            })
        this.loadImage(files)
    }

    loadImage=(files)=>{
        setTimeout(() => {
            this.setState({
                files,
                isLoading: false
            })
        }, 1000);
    }

    onDrop =(files) =>{
        this.setState({files})
    }
    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        return (
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
            {({isDragActive, getRootProps, getInputProps}) => (
              <section className="container">
                <div {...getRootProps({className: 'dropzone back'})}>
                  <input {...getInputProps()} />
                  <i className="far fa-image mb-2 text-muted" style={{fontSize:100}}></i>
                  <p className='text-muted'>{isDragActive ? "Drop some images " : "Drag 'n' drop some files here, or click to select files"}</p>
                </div>
                <aside>
                  {files}
                </aside>

                {this.state.files.length >0 &&
                <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>
                }

                {this.state.isLoading &&
                <Spinner animation="border" role="status"></Spinner>
                }

                {this.state.recentImage &&
                <React.Fragment>
                    <Alert variant='primary'>
                        {this.state.recentImage.data.classified}
                    </Alert>
                    <Image className='justify-content-center' src={this.state.recentImage.data.picture} height='200' rounded/>
                </React.Fragment>
                }
              </section>
            )}
          </Dropzone>
        );
    }
}