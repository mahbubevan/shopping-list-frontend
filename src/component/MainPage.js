import React,{ Component } from 'react'
import { Table,Container,Button,Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input

    } from 'reactstrap'
import axios from 'axios';

class MainPage extends Component{
    constructor(props){
        super(props)

        this.state={
            data:this.props.result,
            modal:false,
            input:'',
            id:0,
            editModal:false,
            index:0
        }
    }

    deleteItem(id){
        if(!window.confirm("Are you sure?")){
            console.log("Canceled")
        }else{

        axios.delete(`api/items/${id}`)
            .then(this.setState({
                data:this.state.data.filter(
                    item=> item._id!==id
                )
            }))
        }
    }

    onSubmit = ()=>{
        const url = 'api/items'
        const data = {
            name:this.state.input
        }
        axios.post(url,data)
            .then((res)=>{
                this.setState({
                    data:[...this.state.data,res.data],
                    input:''
                })
            })
        
        this.toggle()
    }

    setInputValue = (e)=>{
        this.setState({
            input:e.target.value
        })
        console.log(e.target.value)
    }

    // TOggle Modal
    toggle = ()=>{
        this.setState({
            modal:!this.state.modal
        })
    }

    editToggle = ()=>{
        this.setState({
            editModal:!this.state.editModal
        })
    }

    //EDIT Item //
    editItem(id,name,index){
        this.setState({
            id,
            input:name,
            editModal:true,
            index
        })
    }

    //Update Item
    onUpdate = ()=>{
        const {data} = this.state 
        data[`${this.state.index}`].name = this.state.input  
        const url = `api/items/${this.state.id}`
        const newData = {
            name:this.state.input
        }
        axios.put(url,newData)
            .then(this.setState({
                data,
                input:''
            }))

        this.editToggle()
    }

    render(){
        return(
            <div>
                { /*Startign Table */ }
                <Container>
                    <div>
                        <Button className="ml-5 mb-5" onClick={this.toggle} color="info">Add New Item</Button>
                        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                            toggle={this.toggle}>
                            <ModalHeader>Add New Item</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" name="todo" 
                                            value={this.state.input}
                                            onChange = {this.setInputValue}
                                        />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.onSubmit}>Add</Button>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Name</th>
                                <th> Created Date </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data.map(
                                (i,id)=>(
                                    <tr key={i._id}>
                                        <td> { i._id } </td>
                                        <td> { i.name } </td>
                                        <td> { i.date } </td>
                                        <td className="btn btn-info btn-sm mr-2" onClick={this.editItem.bind(this,i._id,i.name,id)}>Edit</td>
                                        <td className="btn btn-danger btn-sm" onClick={this.deleteItem.bind(this,i._id)}>Delete</td>
                                    </tr>
                                )
                            ) }
                        </tbody>
                    </Table>
                </Container>
                { /*Ending Table */ }
                {/*EDit Modal */}
                <div>
                <Modal isOpen={this.state.editModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                            toggle={this.editToggle}>
                            <ModalHeader>Edit this Item</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" name="todo" 
                                            value={this.state.input}
                                            onChange = {this.setInputValue}
                                        />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.onUpdate}>Update</Button>
                                <Button color="secondary" onClick={this.editToggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                </div>
            </div>
        )
    }
}


export default MainPage