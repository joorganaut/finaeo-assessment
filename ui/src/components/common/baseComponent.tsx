import React from 'react';
import ActivityIndicator from './activityIndicator';
import { Redirect } from 'react-router-dom';
import MiddlewareManager from '../../services/middlewareManager';
import {theme} from '../core/theme';
class BaseComponent extends React.Component<any, any>{
    manager: MiddlewareManager;
    theme: any;
    constructor(props: any){
        super(props);
        this.state = {
            IsLoading: true,
            LoadingTitle: props.LoadingTitle,
            Redirect: false,
            RedirectPath: '/',
            RedirectParams: {},
        };
        this.manager = new MiddlewareManager();
        this.theme = theme;
    }
    IsNullOrWhiteSpace(input: string) {
        if (typeof input === 'undefined' || input === null) return true;
        return input.replace(/\s/g, '').length < 1;
    }
    IsNullOrUndefined(input: any){
        if (typeof input === 'undefined' || input === null) return true;
    }
    GetDateAndTime(concat: boolean)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return date+time;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            let time = today.getHours()+''+today.getMinutes() +''+today.getSeconds();
            return date+time;
        }        
    }
    GetTime(concat)
    {
        if(concat){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }else{
            let today = new Date();
            let time = today.getHours()+''+today.getMinutes()+'' + today.getSeconds();
            return time;
        }        
    }
    GetDate(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            return date;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            return date;
        }        
    }
    renderRedirect = (path, obj) => {
        return <Redirect to = {{pathname : path, state : {
            Values : obj
        }}}/>
     }
     renderLoading=()=>{
        return(
            <ActivityIndicator Show={this.state.IsLoading} Title={this.state.LoadingTitle} />
        )
    }
    renderAllComponents=(callback? : any)=>{
        //this.ValidateRoles();
       
        if(this.state.Redirect === true)
        {
            return this.renderRedirect(this.state.RedirectPath, this.state.RedirectParams)
        }
        if(this.state.IsLoading === true)
        {
            return(
                this.renderLoading()
            )
        }
        else{
            return (
                <>
                {callback}
                </>
            )
        }
    }
    render(){
        return(<>
        <div style={{margin: 'auto', position : 'absolute'}}>
        {this.renderAllComponents()}
        </div>
        </>)
    }
}
export default BaseComponent;