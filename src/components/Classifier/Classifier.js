import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import {Spinner, Button, Alert, Image, Table} from 'react-bootstrap'
import axios from 'axios'

import {useDropzone} from 'react-dropzone';



class Classifier extends Component {
    state = {
        files: [],
        result_table:[],
        isLoading: false,
        recentImage: null,
        result_0:0,
        result_1:0,
        result_2:0,
        result_3:0,
        result_4:0,
        result_5:0,
        result_6:0,
        result_7:0,
        result_8:0,
        result_9:0,
        result_10:0,
        result_11:0,
        result_12:0,
        result_13:0,
        result_14:0,
        

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
            let result_string = this.state.recentImage.data.classified
            //let result_list = result_string.split(", ")
            let result_list = JSON.parse("[" + result_string + "]");
            this.setState({result_table:result_list})
            this.setState({result_0:result_list[0][0]})
            this.setState({result_1:result_list[0][1]})
            this.setState({result_2:result_list[0][2]})
            this.setState({result_3:result_list[0][3]})
            this.setState({result_4:result_list[0][4]})
            this.setState({result_5:result_list[0][5]})
            this.setState({result_6:result_list[0][6]})
            this.setState({result_7:result_list[0][7]})
            this.setState({result_8:result_list[0][8]})
            this.setState({result_9:result_list[0][9]})
            this.setState({result_10:result_list[0][10]})
            this.setState({result_11:result_list[0][11]})
            this.setState({result_12:result_list[0][12]})
            this.setState({result_13:result_list[0][13]})
            this.setState({result_14:result_list[0][14]})
            console.log(this.state.result_0)
            //console.log(result_list[0][0])
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

    renderTableData() {
        const listItems = this.state.result_table.map((myList) =>  
            <li>{myList}</li>  
        );  
        return (  
            <div>  
                  <h2>React Map Example</h2>  
                      <ul>{listItems}</ul>  
            </div>  
          );  
    }
     


    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));
        
        
        return (
            <>
            <Dropzone onDrop={this.onDrop} >
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
                                <Alert variant="primary">
                                <Table striped bordered hover size="sm">
                                    <tr>
                                        <th>Thorax</th>
                                        <th>Predic</th>
                                    </tr>
                                    <tr>
                                        <td>Atelectasis</td>
                                        <td>{this.state.result_0} %</td>
                                    </tr>
                                    <tr>
                                        <td>Cardiomegaly</td>
                                        <td>{this.state.result_1} %</td>
                                    </tr>
                                    <tr>
                                        <td>Effusion</td>
                                        <td>{this.state.result_2} %</td>
                                    </tr>
                                    <tr>
                                        <td>Infiltration</td>
                                        <td>{this.state.result_3} %</td>
                                    </tr>
                                    <tr>
                                        <td>Mass</td>
                                        <td>{this.state.result_4} %</td>
                                    </tr>
                                    <tr>
                                        <td>Nodule</td>
                                        <td>{this.state.result_5} %</td>
                                    </tr>
                                    <tr>
                                        <td>Pneumonia</td>
                                        <td>{this.state.result_6} %</td>
                                    </tr>
                                    <tr>
                                        <td>Pneumothorax</td>
                                        <td>{this.state.result_7} %</td>
                                    </tr>
                                    <tr>
                                        <td>Consolidation</td>
                                        <td>{this.state.result_8} %</td>
                                    </tr>
                                    <tr>
                                        <td>Edema</td>
                                        <td>{this.state.result_9} %</td>
                                    </tr>
                                    <tr>
                                        <td>Emphysema</td>
                                        <td>{this.state.result_10} %</td>
                                    </tr>
                                    <tr>
                                        <td>Fibrosis</td>
                                        <td>{this.state.result_11} %</td>
                                    </tr>
                                    <tr>
                                        <td>Pleural Thickening</td>
                                        <td>{this.state.result_12} %</td>
                                    </tr>
                                    <tr>
                                        <td>Hernia</td>
                                        <td>{this.state.result_13} %</td>
                                    </tr>
                                    <tr>
                                        <td>No Finding</td>
                                        <td>{this.state.result_14} %</td>
                                    </tr>
                                       
                                        
                        
                                </Table>
                                </Alert>
                                
                                <Image className='justify-content-center' src={this.state.recentImage.data.picture} height='200' rounded />
                            </React.Fragment>}
                    </section>
                )}
            </Dropzone>

            <React.Fragment>
                <img src="https://www.dropzone.dev/images/icons/github.svg" width={250} height={250} alt='test' />
            </React.Fragment>


            </>
          
        );
    }
}
export default Classifier;
