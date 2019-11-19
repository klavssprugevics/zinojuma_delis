import React, {Component} from 'react';


class InputField extends Component{

    constructor(props)
    {
        super(props);
        this.state = 
        {
            inputValue: '',
            inputPlaceHolder: props.Nosaukums,
            textArea: props.textArea
        }
    }

    updateInput(event)
    {
        this.setState({
            inputValue: event.target.value
          });
    }

    render()
    {
        console.log("Te kaut kas neiet..");
        if(this.state.textArea === "false")
        {
            return(
                <div>
                    <input value={this.state.inputValue} onChange={evt => this.updateInput(evt)}/><br/>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <textarea value={this.state.inputValue} onChange={evt => this.updateInput(evt)}/><br/>
                </div>
            );
        }

    }

}

export default InputField;
