import React from 'react';
import BaseComponent from "../baseComponent";
import Header from './header';
import Body from './body';
import {Table} from 'react-bootstrap';

class TableHOC extends BaseComponent{

    render(){
        return(
            <>
            <div className="center">
            <Table  variant="" striped bordered hover size='md' className="col-lg-8 col-md-8 col-sm-8 center">
                <Header values={this.props.Headers}></Header>
                <Body values={this.props.Items} type={this.props.type}></Body>
            </Table></div>
            </>
        )
    }
}
export default TableHOC;