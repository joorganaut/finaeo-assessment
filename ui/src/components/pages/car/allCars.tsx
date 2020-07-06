import React from "react";
import swal from 'sweetalert';
import BaseComponent from "../../common/baseComponent";
import TableHOC from "../../common/table";
import CarSystem from "../../../services/carSystem";

class AllCars extends BaseComponent{
    Headers: string[];
    system: CarSystem;
    constructor(props: any){
        super(props);
        this.state = {
            Items : []
        }
        this.Headers = ["ID", "Make", "Model", "User ID"];
        this.system = new CarSystem();
    }
    async componentDidMount() {
        this.setState({ IsLoading: true });
        try {
            await this.system.RetrieveAllCars().then(async res => {
                if(!this.IsNullOrUndefined(res)){
                    this.setState({ Items: res });
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
              Items={this.state.Items} type={'car'}></TableHOC>
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default AllCars;