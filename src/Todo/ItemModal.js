import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.Edit
        }
    }
    assignValue() {
        console.log(this.props.Edit, "data")
        if (this.props.Edit.length != 0) {
            this.setState({
                fname: this.props.Edit.first_name,
                lname: this.props.Edit.last_name,
                email: this.props.Edit.email,
                city: this.props.Edit.city,
                pincode: this.props.Edit.pincode,
                state: this.props.Edit.states
            })
        }
    }

    componentDidUpdate(prevProps, nextProps) {
        console.log(prevProps)
        if (prevProps.Edit != this.props.Edit) {
            this.assignValue()
        }
    }
    hadleClose = () => {

        this.props.Close()

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    SaveItem = (e) => {
        if (this.state.email == undefined || this.state.fname == undefined || this.state.lname == undefined || this.state.pincode == undefined || this.state.city == undefined || this.state.state == undefined) {
            alert("Please fill all the values")
            return false
        }
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) && this.state.pincode.length > 5) {
            let updatedItem = {
                param1: this.state.email,
                param2: this.state.fname,
                param3: this.state.lname,
                param4: this.state.pincode,
                param5: this.state.city,
                param6: this.state.state

            }
            this.props.AddData(e, updatedItem)
        }
        else {
            alert("you entered wrong mail id or pincode needs 6 digit")
            return false
        }

    }
    updateItem = (e) => {
        let updatedItem = {
            param1: this.state.email,
            param2: this.state.fname,
            param3: this.state.lname,
            param4: this.state.pincode,
            param5: this.state.city,
            param6: this.state.state

        }
        this.props.EditData(e, updatedItem)
    }
    render() {
        return (
            <>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className="item-modal"
                    open={this.props.Open}



                >

                    <div className="modal-content" >

                        <form >
                            <div className="input-content">
                                <div>
                                    <label>First Name</label><br />
                                    <TextField id="standard-basic" name="fname" value={this.state.fname} variant="outlined" size="small" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label>Last Name</label><br />
                                    <TextField id="standard-basic" name="lname" value={this.state.lname} variant="outlined" size="small" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <label>Email</label><br />
                                    <TextField id="standard-basic" name="email" value={this.state.email} disabled={(this.props.Edit.length != 0) ? true : false} variant="outlined" size="small" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="input-content">
                                <div>
                                    <label>State</label><br />
                                    <FormControl size="small">
                                        <Select
                                            native
                                            value={this.state.state}
                                            variant="outlined"
                                            name="state"

                                            onChange={this.handleChange}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujrat">Gujrat</option>
                                            <option value="Delhi">Delhi</option>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <label>City</label><br />
                                    <TextField id="standard-basic" name="city" value={this.state.city} variant="outlined" onChange={this.handleChange} size="small" />
                                </div>
                                <div>
                                    <label>Pincode</label><br />
                                    <TextField id="standard-basic" name="pincode" value={this.state.pincode} variant="outlined" onChange={this.handleChange} size="small"  />
                                </div>
                            </div>
                            <div className="btn-group">
                                {
                                    this.props.Edit.length != 0
                                        ? <Button variant="contained" color="primary" onClick={this.updateItem} >Update</Button>
                                        : <Button variant="contained" color="primary" onClick={this.SaveItem} >Save</Button>
                                }

                                <Button variant="contained" color="secondary" onClick={this.hadleClose}  >Cancel</Button>

                            </div>


                        </form>

                    </div>

                </Modal>
            </>
        );
    }
}

export default ItemModal;