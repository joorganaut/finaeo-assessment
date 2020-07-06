import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import User, {AllUsers, ManageUser, Car, AllCars, ManageCar} from '../components/pages';
export default function Routes (){
    return(
    <BrowserRouter>
    <Switch>
        <Route path='/' exact component={AllUsers}/>
        <Route path='/User/*' exact component={User}/>
        <Route path='/manageUser/*' exact component={ManageUser}/>
        <Route path='/AllCars' exact component={AllCars}/>
        <Route path='/Car/*' exact component={Car}/>
        <Route path='/manageCar/*' exact component={ManageCar}/>
    </Switch>
    </BrowserRouter>
    );
}