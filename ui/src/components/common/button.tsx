import React, { Component, MouseEvent } from "react";
class Button extends Component<any, any>{
    handleClick(event: MouseEvent) {
        event.preventDefault();
        alert(event.currentTarget.tagName); // alerts BUTTON
      }
      
      render() {
        return <button onClick={this.handleClick}>
          {this.props.children}
        </button>
      }
}
export default Button;