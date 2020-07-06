import React from "react";
import swal from 'sweetalert';
import BaseComponent from "../../common/baseComponent";
import TableHOC from "../../common/table";
import { UserRole } from "../../enums/userRoles";
import UserSystem from "../../../services/userSystem";

class AllUsers extends BaseComponent{
    Headers: string[];
    system: UserSystem;
    constructor(props: any){
        super(props);
        this.state = {
            Items : []
        }
        this.system = new UserSystem()
        this.Headers = ["ID", "Given Name", "Family Name", "Date of Birth", "Role"];
    }
    async componentDidMount() {
        this.setState({ IsLoading: true });
        try {
            await this.system.RetrieveAllUsers().then(async res => {
                if(!this.IsNullOrUndefined(res.data)){
                    let items: any[] = [];
                    res.data.res.map((x: any)=>{
                        x.role = UserRole[x.role]
                        return items.push(x);
                    })
                    this.setState({ Items: items });
                }
                this.setState({ IsLoading: false });
            });
        } catch (e) {
            swal({
                title: "Error!",
                text: 'oops!! something terrible happened: '+e.message,
                icon: "error"
            })
        }
        this.setState({ IsLoading: false });
    }

    renderPage(){
        return(<>
        
            <TableHOC
             Type="Users" 
             Headers={this.Headers}
              Items={this.state.Items} type={'user'}></TableHOC>
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default AllUsers;