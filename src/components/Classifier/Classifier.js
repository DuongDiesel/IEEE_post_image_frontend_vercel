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


        result :[{
                    _id:0,
                    thorax:"Atelectasis",
                    value:0
                },{
                    _id:1,
                    thorax:"Cardiomegaly",
                    value:0
                },{
                    _id:2,
                    thorax:"Effusion",
                    value:0
                },{
                    _id:3,
                    thorax:"Infiltration",
                    value:0
                },{
                    _id:4,
                    thorax:"Mass",
                    value:0
                },{
                    _id:5,
                    thorax:"Nodule",
                    value:0
                },{
                    _id:6,
                    thorax:"Pneumonia",
                    value:0
                },{
                    _id:7,
                    thorax:"Pneumothorax",
                    value:0
                },{
                    _id:8,
                    thorax:"Consolidation",
                    value:0
                },{
                    _id:9,
                    thorax:"Edema",
                    value:0
                },{
                    _id:10,
                    thorax:"Emphysema",
                    value:0
                },{
                    _id:11,
                    thorax:"Fibrosis",
                    value:0
                },{
                    _id:12,
                    thorax:"Pleural Thickening",
                    value:0
                },{
                    _id:13,
                    thorax:"Hernia",
                    value:0
                },{
                    _id:14,
                    thorax:"No Finding",
                    value:0
                }],
        

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
   
            // <td>Atelectasis</td>[0][0]
            // <td>Cardiomegaly</td>
            // <td>Effusion</td>
            // <td>Infiltration</td>
            // <td>Mass</td>
            // <td>Nodule</td>
            // <td>Pneumonia</td>
            // <td>Pneumothorax</td>
            // <td>Consolidation</td>
            // <td>Edema</td>
            // <td>Emphysema</td>
            // <td>Fibrosis</td>
            // <td>Pleural Thickening</td>
            // <td>Hernia</td>
            // <td>No Finding</td>[0][14]
                                       

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 0 ? Object.assign(obj, { value: result_list[0][0]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 1 ? Object.assign(obj, { value: result_list[0][1]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 2 ? Object.assign(obj, { value: result_list[0][2]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 3 ? Object.assign(obj, { value: result_list[0][3]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 4 ? Object.assign(obj, { value: result_list[0][4]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 5 ? Object.assign(obj, { value: result_list[0][5]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 6 ? Object.assign(obj, { value: result_list[0][6]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 7 ? Object.assign(obj, { value: result_list[0][7]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 8 ? Object.assign(obj, { value: result_list[0][8]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 9 ? Object.assign(obj, { value: result_list[0][9]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 10 ? Object.assign(obj, { value: result_list[0][10]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 11 ? Object.assign(obj, { value: result_list[0][11]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 12 ? Object.assign(obj, { value: result_list[0][12]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 13 ? Object.assign(obj, { value: result_list[0][13]}) : obj)
              )
            }));

            this.setState(prevState => ({
                result: prevState.result.map(
                obj => (obj._id === 14 ? Object.assign(obj, { value: result_list[0][14]}) : obj)
              )
            }));

            console.log(this.state.result)
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

     


    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));

        const openLinkInNewTab = ( url ) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if ( newTab ) newTab.opener = null;
        }

        const items = [];
        const numAscending = [...this.state.result].sort((a, b) => b.value - a.value);
        for (const thorax of numAscending) {

            
            items.push(
            
                <tr>
                <td>{thorax.thorax}</td>
                <td>{thorax.value} %</td>
                </tr>

            )
        }
        
        
        return (
            <>
            <Dropzone onDrop={this.onDrop} >
                {({ isDragActive, getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone back' })}>
                            <input {...getInputProps()} />
                            <i className="far fa-image mb-2 text-muted" style={{ fontSize: 100 }}></i>
                            <p className='text-muted'>{isDragActive ? "Drop some images " : "ここにファイルをドラッグ アンド ドロップするか、クリックしてファイルを選択します。"}</p>
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
                                <Alert variant="success">
                                <Table striped bordered hover size="sm">
                                    <tr>
                                        <th>Thorax</th>
                                        <th>Predic</th>
                                    </tr>
                                    {items}
                                       
                                        
                        
                                </Table>
                                </Alert>
                                
                            </React.Fragment>}
                    </section>
                )}
            </Dropzone>

            <React.Fragment>
                <img src="https://www.dropzone.dev/images/icons/github.svg" width={150} height={150} alt='github code' />
            </React.Fragment>



            <Button variant="outline-secondary" onClick={ () => openLinkInNewTab('https://mighty-forest-71579.herokuapp.com/')}> 疾患イメージのサンプル </Button>



            </>
          
        );
    }
}
export default Classifier;
