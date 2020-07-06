import React from "react";
import BaseComponent from "../../common/baseComponent";

class Header extends BaseComponent{
    constructor(props?: any){
        super(props);
        this.state={
            values : props.values,
        }
    }
    renderPage(){
        return(
            <thead>
                <tr>
                {this.state.values.map(col =>{
                return(<th  className='text-center' key={`header-${col}`}>{col}</th>)
                })}
                <th></th>
                <th>
                {/* <a className="btn btn-warning shadow"
                style={{borderRadius : 100}}
                title="view details" href={'/User/'}>
                    New
                    </a> */}
                </th>
                </tr>
            </thead>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default Header;