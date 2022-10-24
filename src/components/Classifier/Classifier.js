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
            this.setState({result_0:result_list[0]})
            this.setState({result_1:result_list[1]})
            this.setState({result_2:result_list[2]})
            this.setState({result_3:result_list[3]})
            this.setState({result_4:result_list[4]})
            this.setState({result_5:result_list[5]})
            this.setState({result_6:result_list[6]})
            this.setState({result_7:result_list[7]})
            this.setState({result_8:result_list[8]})
            this.setState({result_9:result_list[9]})
            this.setState({result_10:result_list[10]})
            this.setState({result_11:result_list[11]})
            this.setState({result_12:result_list[12]})
            this.setState({result_13:result_list[13]})
            this.setState({result_14:result_list[14]})
            console.log(this.state.result_14)
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
                                <Table striped bordered hover>
                                    
                                        <tr>
                                            <th>Benh</th>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                            <td>Benh</td>
                                        </tr>
                                        <tbody>
                                        <tr>
                                            <th>Predic %</th>
                                            <td>{this.state.result_table[0]}</td>
                                            <td>{this.state.result_table[1]}</td>
                                            <td>{this.state.result_table[2]}</td>
                                            <td>{this.state.result_table[3]}</td>
                                            <td>{this.state.result_table[4]}</td>
                                            <td>{this.state.result_table[5]}</td>
                                            <td>{this.state.result_table[6]}</td>
                                            <td>{this.state.result_table[7]}</td>
                                            <td>{this.state.result_table[8]}</td>
                                            <td>{this.state.result_table[9]}</td>
                                            <td>{this.state.result_table[10]}</td>
                                            <td>{this.state.result_table[11]}</td>
                                            <td>{this.state.result_table[12]}</td>
                                            <td>{this.state.result_table[13]}</td>
                                            <td>{this.state.result_table[14]}</td>
                                        </tr>
                                        </tbody>
                        
                                </Table>
  
                                
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
