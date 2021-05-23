import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ItemModal from './ItemModal'
import Modal from '@material-ui/core/Modal';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            list: [],
            dltModal:false,
            openModal: false,
            dltmail:'',
            edit: {},
        }
    }
    closeModal = () => {
        let arr = [this.state.edit]
        
        arr.splice(0,arr.length)
        this.setState({ openModal: false, edit: {} })
    }
    componentDidMount = () => {

        this.getData()

    }
    triggerModal = (e, id) => {
        console.log(this.state.list[id])

        this.setState({
            openModal: true,
            edit: this.state.list[id]
        })
    }
    editItem = async (e, obj) => {
        console.log(obj, "object values")
        const res = await axios.post(
            "https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/edit",
            obj,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",

                }
            }
        )

            .then((res) => {
                console.log(res)
                this.setState({ list: res.data })
            })
            .catch(e => console.error(e))
        this.getData()
    }
    AddItem = async (e, obj) => {

        const res = await axios.post(
            "https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/add",
            obj,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",

                }
            }
        )

            .then((res) => {
                console.log(res)
                this.setState({ list: res.data })
            })
            .catch(e => console.error(e))
        this.getData()
    }
    getData = async () => {
        const res = await axios.get("https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch")
            .then((res) => {
                this.setState({ list: res.data.data })

            })
            .catch(e => console.error(e))


    }
     
    deleteItem = async (item) => {
        const res = await axios.delete(
            "https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete",
            { param1: item },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log(res)
                this.setState({ list: res.data })
            })
            .catch(e => console.error(e))
        this.getData()

    }
    addItem = async (e) => {

    }
    displayData = () => {

        return (this.state.list).map((data, indx) => {
            return (
                <TableRow key={uuidv4()} >
                    <TableCell >{indx + 1}</TableCell>
                    <TableCell >{data.first_name}</TableCell>
                    <TableCell >{data.last_name}</TableCell>
                    <TableCell >{data.email}</TableCell>
                    <TableCell >{data.states}</TableCell>
                    <TableCell >{data.city}</TableCell>
                    <TableCell >{data.pincode}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary"  id="btn" onClick={(e) => this.triggerModal(e, indx)}>Edit</Button>
                        <Button variant="contained" color="secondary" id="btn"   onClick={(e) =>  this.deleteItem(data.email)}>Delete</Button>
                    </TableCell>
                </TableRow>
            )
        })


    }
    handleSearch = (value) => {
        if (value == "") {
            this.getData()
        }
        (this.state.list).filter((item, indx) => {
            if (item.first_name == value) {
                console.log(this.state.list[indx])
                this.setState({
                    list: [this.state.list[indx]]
                })
            }


        })

    }
    render() {
        return (
            <>

                <div className="srch-content">
                    <span onClick={(e) => this.setState({ openModal: true,edit:[] })}>+ Add Record</span>
                    <TextField id="standard-basic" n variant="outlined" size="small" onChange={(e) => this.handleSearch(e.target.value)} />
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr.No</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Pincode</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.displayData()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ItemModal Open={this.state.openModal} Close={this.closeModal} Edit={this.state.edit} AddData={this.AddItem} EditData={this.editItem} />
                <strong>I'm facing issue when calling an api i also added heaader but still gives an erro so kindly check the img placed inside public folder apierror.jpg</strong>
                
            </>
        );
    }
}

export default Todo;