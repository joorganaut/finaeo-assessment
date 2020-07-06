import React, {Component} from 'react';
import '../core/navBar.css';

class NavBar extends Component<any, any>{
    constructor(props: any)
    {
        super(props)
        this.state={
            homeAction : props.homeAction,
            searchAction : props.searchAction,
            saveAction : props.saveAction,
            editAction : props.editAction,
            previewAction : props.previewAction,
            deleteAction : props.deleteAction,
            backAction : props.backAction,
            clearAction : props.clearAction,
            homeDisabled : props.homeDisabled,
            searchDisabled : props.searchDisabled,
            saveDisabled : props.saveDisabled,
            previewDisabled : props.previewDisabled,
            deleteDisabled : props.deleteDisabled,
            editDisabled : props.editDisabled,
            backDisabled : props.backDisabled,
            clearDisabled : props.clearDisabled
        }
    }
    RenderHome=()=>{
        if(this.state.homeDisabled !== true)
        {
            return <a href="/" title="home" className="active" >
               Home</a>
        }
    }
    RenderPreview=()=>{
        if(this.state.previewDisabled !== true)
        {
            return <a href="/AllCars" title="preview" >
                Cars</a>
        }
    }
    RenderEdit=()=>{
        if(this.state.editDisabled !== true)
        {
            return <a href="/manageCar/" title="edit" onClick={this.state.editAction}>
                New Car
                </a>
        }
    }
    RenderSave=()=>{
        if(this.state.saveDisabled !== true)
        {
            return <a href="/manageUser/" title="save" onClick={this.state.saveAction}>
                New User
                </a>
        }
    }
    RenderDelete=()=>{
        if(this.state.deleteDisabled !== true)
        {
            return <a href="#/" title="delete" onClick={this.state.deleteAction}><i className="fas fa-trash"></i></a>
        }
    }
    RenderSearch=()=>{
        if(this.state.searchDisabled !== true)
        {
            return <a href="#/" title="search" onClick={this.state.searchAction}><i className="fas fa-search"></i></a>
        }
    }
    RenderBack=()=>{
        if(this.state.backDisabled !== true)
        {
            return <a href="#/" title="back" onClick={this.state.backAction}><i className="fas fa-chevron-left"></i></a>
        }
    }
    RenderClear=()=>{
        if(this.state.clearDisabled !== true)
        {
            return <a href="#/" title="clear" onClick={this.state.clearAction}><i className="fas fa-times"></i></a>
        }
    }
    render(){
        return(<>
        <div className="row">
        <div className="icon-bar">
            {this.RenderHome()}
            {this.RenderPreview()}
            {this.RenderSave()}
            {this.RenderEdit()}
            {this.RenderBack()}
            
            {/* <a href="" title="clear"><i className="fas fa-trash"  onClick={this.state.deleteAction} disabled={this.state.deleteDisabled}></i></a>  */}
        </div>
        </div>
        </>)
    }
}
export default NavBar;
