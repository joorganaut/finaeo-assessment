import BaseComponent from "../../common/baseComponent";
import React, { ChangeEvent } from 'react';
import {Form, Button} from 'react-bootstrap';
import swal from 'sweetalert';
import CarSystem from "../../../services/carSystem";
import UserSystem from "../../../services/userSystem";
class ManageCar extends BaseComponent{
    system: CarSystem;
    userSystem: UserSystem;
    constructor(props: any){
        super(props);
        this.state = {
            Car : props.location.state !== undefined ? props.location.state.Values : {},
            Users: []
        }
        this.system = new CarSystem();
        this.userSystem = new UserSystem();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    async componentDidMount(){
        this.setState({ IsLoading: true });
        try {
            await this.userSystem.RetrieveAllUsers().then(async res => {
                if(!this.IsNullOrUndefined(res.data)){
                    this.setState({ Users: res.data.res });
                }
                this.setState({ IsLoading: false });
            });
        } catch (e) {
            alert('oops!! something terrible happened: '+e.message)
        }
        this.setState({ IsLoading: false });
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        let Car = this.state.Car;
        if(Car === undefined){
            Car = {};
        }
        Car[e.target.name] = e.target.value
        this.setState({Car : Car});
    }
    async ProcessCar(data: any, isUpdate: boolean){
        if(isUpdate){
            await this.system.UpdateCar(data).then(async res => {
                if(!this.IsNullOrUndefined(res)){
                    this.setState({Redirect: true,
                        RedirectPath: '/AllCars',})
                }else{
                    swal({
                        title: "Error!",
                        text: "Unable to update Car: " + res.data.error,
                        icon: "error"
                    })
                }
                this.setState({ IsLoading: false });
            });
        }else{
            await this.system.AddCar(data).then(async res => {
                if(!this.IsNullOrUndefined(res)){
                    this.setState({Redirect: true,
                        RedirectPath: '/AllCars',})
                }else{
                    swal({
                        title: "Error!",
                        text: "Unable to save Car: " + res.data.error,
                        icon: "error"
                    })
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
                    if(this.state.Car.id > 0){
                        // alert('this is an update')  
                        await this.ProcessCar(this.state.Car, true);
                    }else{
                        // alert('this is a save')
                        await this.ProcessCar(this.state.Car, false);
                    }
                }
            })
        }catch(e){
            swal({
                title: "Error!",
                text: "Unable to save product info: " + e.message,
                icon: "error"
            })
        }
        this.setState({IsLoading : false})
    }
    handleBack(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/AllCars',
            RedirectParams: {},})
    }
    renderPage(){
        return(<>
        <div className="col-lg-4">
        <Form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <Form.Group controlId="formBasicMake">
                    <Form.Label>Make</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter Make" 
                    name='make'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.Car !== undefined ? this.state.Car.make : ''} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter Model"  
                    name='model'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.Car !== undefined ? this.state.Car.model : ''}  />
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>User</Form.Label>
                    <Form.Control as="select" custom 
                    name='user'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{this.handleChange(e)}}
                    value={this.state.Car !== undefined ? this.state.Car.user : 0}>
                        {this.state.Users !== undefined ? this.state.Users.map(item=>(
                            <option value={item.id}>{item.givenName}</option>
                        )):  <option value={0}>No User</option>}
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
export default ManageCar;