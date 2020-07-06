import React from "react";
import BaseComponent from "../../common/baseComponent";
import swal from 'sweetalert';
import {UserRole} from '../../enums/userRoles';
import {Card, Button} from 'react-bootstrap';
import UserSystem from "../../../services/userSystem";

class User extends BaseComponent{
    system: UserSystem;
    constructor(props: any) {
        super(props);
        let query = new URLSearchParams(props.location.search).get("id");
        this.state = {
            id: query,
            user: {}
        }
        this.system = new UserSystem();
        this.HandleDelete = this.HandleDelete.bind(this);
    }
    async DeleteUser(id: number){
        await this.system.DeleteUser(this.state.id).then(async res => {
            if(!this.IsNullOrUndefined(res.data)){
                if(res.data.res){
                    this.setState({Redirect: true,
                        RedirectPath: '/',})
                }else{
                    swal({
                        title: "Error!",
                        text: "Unable to delete user: " + res.data.error,
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
            RedirectPath: '/',})
    }
    async HandleNew(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/manageUser/',})
    }
    async HandleEdit(e: MouseEvent){
        e.preventDefault();
        this.setState({Redirect: true,
            RedirectPath: '/manageUser/', 
            RedirectParams: this.state.user
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
                    await this.DeleteUser(this.state.id).then(async () => {
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
            await this.system.RetrieveUser(this.state.id)
            .then(async res => {
                if (!this.IsNullOrUndefined(res)) {
                    this.setState({ user: res.data.res });
                }
                this.setState({ IsLoading: false });
            });
        } catch (e) {
            alert('oops!! something terrible happened: ' + e.message)
        }
        this.setState({ IsLoading: false });
    }
    renderPage(){
        let user = this.state.user;
        return(<>
                   <Card style={{ width: '25rem' }}>
                    <Card.Body>
                    <Card.Title>
                        {user !== undefined ? user.givenName + ' ' + user.familyName : ''}
                        </Card.Title>
                        <Card.Text>
                        Date of Birth: {user !== undefined ? user.dateOfBirth : ''}
                        </Card.Text>
                        <Card.Text>
                        Role: {user !== undefined ? UserRole[user.role] : ''}
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
export default User;