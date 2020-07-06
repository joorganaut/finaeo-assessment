import BaseComponent from "../../common/baseComponent";
import React, { ChangeEvent } from 'react';
import {Form, Button} from 'react-bootstrap';
import swal from 'sweetalert';
import UserSystem from "../../../services/userSystem";
class ManageUser extends BaseComponent{
    system: UserSystem;
    constructor(props: any){
        super(props);
        this.state = {
            user : props.location.state !== undefined ? props.location.state.Values : {},
        }
        this.system = new UserSystem();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        let user = this.state.user;
        if(user === undefined){
            user = {};
        }
        user[e.target.name] = e.target.value
        this.setState({user : user});
    }
    async ProcessUser(data: any, isUpdate: boolean){
        if(isUpdate){
            await this.system.UpdateUser(data).then(async res => {
                if(!this.IsNullOrUndefined(res.data)){
                    if(res.data.res !== undefined){
                        this.setState({Redirect: true,
                            RedirectPath: '/',})
                    }else{
                        swal({
                            title: "Error!",
                            text: "Unable to update user: " + res.data.error,
                            icon: "error"
                        })
                    }
                }
                this.setState({ IsLoading: false });
            });
        }else{
            await this.system.AddUser(data).then(async res => {
                if(!this.IsNullOrUndefined(res.data)){
                    if(res.data.res !== undefined){
                        this.setState({Redirect: true,
                            RedirectPath: '/',})
                    }else{
                        swal({
                            title: "Error!",
                            text: "Unable to save user: " + res.data.error,
                            icon: "error"
                        })
                    }
                }
                this.setState({ IsLoading: false });
            });
        }
        
    }
    async handleSubmit(e: MouseEvent){
        e.preventDefault();
        this.setState({IsLoading : true})
        try{
            await swal({
                title: "Alert",
                text: `Are you sure?`,
                icon: "warning",
                dangerMode: true,
            }).then(async s => {
                console.log(s);
                if (s) {
                    if(this.state.user.id > 0){
                        // alert('this is an update')  
                        await this.ProcessUser(this.state.user, true);
                    }else{
                        // alert('this is a save')
                        await this.ProcessUser(this.state.user, false);
                    }
                }
            })
        }catch(e){
            swal({
                title: "Error!",
                text: "Unable to save product info: " + e.message,
                icon: "error",
                dangerMode: true
            })
        }
        this.setState({IsLoading : false})
    }
    handleBack(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/',
            RedirectParams: {},})
    }
    renderPage(){
        return(<>
        <div className="col-lg-4">
        <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <Form.Group controlId="formBasicGivenName">
                    <Form.Label>Given name</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter Given Name" 
                    name='givenName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.user !== undefined ? this.state.user.givenName : ''} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicFamilyName">
                    <Form.Label>Family Name</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter Family Name"  
                    name='familyName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.user !== undefined ? this.state.user.familyName : ''}  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" 
                    placeholder="select date of birth"  
                    name='dateOfBirth'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.user !== undefined ? this.state.user.dateOfBirth : ''}   />
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" custom 
                    name='role'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.user !== undefined ? this.state.user.role : 0}>
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Super</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e)=>{this.handleSubmit(e)}}>
                    Submit
                </Button> &nbsp;  &nbsp;
                <Button variant="danger" type="submit" onClick={(e)=>{this.handleBack(e)}}>
                    Back
                </Button>
                </Form>
        </div>
               
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default ManageUser;