import React from "react";
import BaseComponent from "../../common/baseComponent";
import swal from 'sweetalert';
import {Card, Button} from 'react-bootstrap';
import CarSystem from "../../../services/carSystem";
import UserSystem from "../../../services/userSystem";
import UserModel from "../../models/userModel";

class Car extends BaseComponent{
    system: CarSystem;
    userSystem: UserSystem;
    constructor(props: any) {
        super(props);
        let query = new URLSearchParams(props.location.search).get("id");
        this.state = {
            id: query,
            Car: {},
            User: {}
        }
        this.system = new CarSystem();
        this.userSystem = new UserSystem();
        this.HandleDelete = this.HandleDelete.bind(this);
    }
    async GetUser(id: number){
        await this.userSystem.RetrieveUser(id).then(res=>{
            if (!this.IsNullOrUndefined(res.data)) {
                this.setState({ User: res.data.res });
            }
        })
    }
    async DeleteCar(id: number){
        await this.system.DeleteCar(this.state.id).then(async res => {
            if(!this.IsNullOrUndefined(res)){
                if(res){
                    this.setState({Redirect: true,
                        RedirectPath: '/AllCars',})
                }else{
                    swal({
                        title: "Error!",
                        text: "Unable to delete Car",
                        icon: "error"
                    })
                }
            }
            this.setState({ IsLoading: false });
        });
    }
    async HandleBack(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/AllCars/',})
    }
    async HandleNew(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/manageCar/',})
    }
    async HandleEdit(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/manageCar/', 
            RedirectParams: this.state.Car
        })
    }
    async HandleDelete(e: MouseEvent){
        e.preventDefault();
        this.setState({IsLoading : true, LoadingTitle : "Deleting"});
        try{
            await swal({
                title: "Alert",
                text: `Are you sure?`,
                icon: "warning",
                dangerMode: true,
            }).then(async s => {
                console.log(s);
                if (s) {
                    await this.DeleteCar(this.state.id).then(async () => {
                         this.setState({
                            IsLoading: false
                        });
                    })
                }
            })
        }catch(e){
            swal({
                title: "Error!",
                text: "Unable to delete car: " + e.message,
                icon: "error"
            })
        }
        this.setState({IsLoading : false})
    }
    async componentDidMount() {
        this.setState({ IsLoading: true });
        try {
            await this.system.RetrieveCar(this.state.id)
            .then(async res => {
                if (!this.IsNullOrUndefined(res)) {
                    this.setState({ Car: res });
                    await this.GetUser(this.state.Car.user)
                }
                this.setState({ IsLoading: false });
            });
        } catch (e) {
            alert('oops!! something terrible happened: ' + e.message)
        }
        this.setState({ IsLoading: false });
    }
    renderPage(){
        let User: UserModel = new UserModel(this.state.User);
        return(<>
                   <Card style={{ width: '25rem' }}>
                    <Card.Body>
                    <Card.Title>
                        {this.state.Car !== undefined ? this.state.Car.make + ' ' + this.state.Car.model : 'No Car'}
                        </Card.Title>
                        <Card.Text>
                            {User !== undefined ? User.givenName + ' ' + User.familyName : ''}
                        </Card.Text>
                        <Button variant="primary" onClick={(e)=>this.HandleNew(e)}>new</Button> &nbsp;  &nbsp;
                        <Button variant="secondary" onClick={(e)=>this.HandleEdit(e)}>edit</Button> &nbsp;  &nbsp;
                        <Button variant="danger" onClick={(e)=>this.HandleDelete(e)}>delete</Button> &nbsp;  &nbsp;
                        <Button variant="primary" onClick={(e)=>this.HandleBack(e)}>back</Button> &nbsp;  &nbsp;
                    </Card.Body>
                    </Card>
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default Car;