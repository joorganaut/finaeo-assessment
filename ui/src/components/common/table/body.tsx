import React from "react";
import BaseComponent from "../../common/baseComponent";
class Body extends BaseComponent{
    constructor(props?: any){
        super(props);
        this.state={
            values : props.values,
            type: props.type
        }
    }
    renderPage(){
        return(
            <tbody>
            
            {this.state.values.map(item =>{
                return(
                    <tr>
                        {Object.values(item).map(function(col: any){
                            return <td className='text-center'>{col}</td>;
                        }
                        )}
                        <td>
                            <a className="btn btn-primary shadow"
                            
                            title="view details" href={'/'+this.state.type+'/?id='+item.id}>
                                View
                                </a></td>
                                <td>
                            {/* <a className="btn btn-danger shadow" title="details" href={'/User/'+item.id}>
                                delete
                                </a> */}
                                </td>
                </tr>
                )
        })}
        </tbody>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default Body;