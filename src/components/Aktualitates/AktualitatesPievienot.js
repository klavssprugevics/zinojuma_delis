import React, {Component} from 'react';
import './AktualitatesPievienot.scss';
import axios from 'axios';


class AktualitatesPievienot extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            nosaukums: '',
            apraksts: '',
            autors: ''
        }
        this.ParseInput = this.ParseInput.bind(this);
    }

    ParseInput()
    {
        console.log(this.state.nosaukums);
        console.log(this.state.apraksts);
        console.log(this.state.autors);



    }

    updateInput(event)
    {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
          });

    }

    render()
    {
        return(
            <div>
                <input name="nosaukums" type="text" value={this.state.nosaukums} onChange={evt => this.updateInput(evt)} />
                <textarea name="apraksts" type="text" value={this.state.apraksts}  onChange={evt => this.updateInput(evt)} />
                <input name="autors" type="text" value={this.state.autors} onChange={evt => this.updateInput(evt)} />

                <button type="button" onClick={this.ParseInput}>Publicēt!</button> 
            </div>
        );
    }


}
export default AktualitatesPievienot;
