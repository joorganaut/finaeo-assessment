import * as React from 'react';
import {theme} from '../core/theme';
import Levels from 'react-activity/lib/Levels';
import 'react-activity/lib/Levels/Levels.css';
class ActivityIndicator extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state={
            Show : props.Show,
            Title: props === undefined || props.Title === undefined ? 'Loading' : props.Title,
        };
        this.toggleIndicator = this.toggleIndicator.bind(this);
    }
    toggleIndicator(){
        if(this.state.Show){
            return(<>
            <div style={{alignSelf: 'center'}}>
            <div>
                {/* <Sentry color={theme.colors.brand} size={32} speed={1} animating={this.state.Show} /> */}
                <Levels color={theme.colors.brand} size={100} speed={1} animating={this.state.Show} />
                </div>
                {this.state.Title}.....
            </div>
            </>)
        }else{
            return(<></>)
        }
    }
    render(){
        return(<>
            <div className='activityIndicator'>
                {this.toggleIndicator()}
            </div>
        </>)
    }
}
export default ActivityIndicator;