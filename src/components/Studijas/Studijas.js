import React, {Component} from 'react';
import ViewInfo from './../shared-functions/ViewInfo.js';

import './Studijas.scss';
import './../utils/Design.scss';

// Komponente, kas strādās kā wrappers Lekciju izmaiņām un paziņojumiem.
class Studijas extends Component{

    constructor()
    {
        super();
        this.state = 
        {
            selectLabel: "pazinojums"
        }
        this.ChangeInput = this.ChangeInput.bind(this);
    }
    
    ChangeInput(event) {
        this.setState({
            selectLabel: event.target.value,
        });
    }

    render()
    {
        return(
            <div className="pageStuff">
                <select className="selectBox" value={this.state.selectLabel} onChange={this.ChangeInput}>
                    <option value="pazinojums">Paziņojumi</option>
                    <option value="lekcija">Lekciju izmaiņas</option>
                </select>
               
                <div>
                    {this.state.selectLabel === "pazinojums" &&
                        <ViewInfo
                        customMessage="Jaunākie paziņojumi studijās!"
                        urlParams="pazinojumi"
                        fieldNames = {[
                        "nosaukums",
                        "apraksts"
                        ]}
                        cssNames ={[
                        "nosaukums",
                        "apraksts",
                        ]}
                        />
                    }
                    {this.state.selectLabel === "lekcija" &&
                        <ViewInfo
                        customMessage="Lekciju izmaiņas"
                        urlParams="lekcijas"
                        fieldNames = {[
                            "kurss",
                            "datums",
                            "laiks",
                            "kabinets",
                            "statuss"
                        ]}
                        cssNames ={[
                            "nosaukums",
                            "datums",
                            "laiks",
                            "kabinets",
                            "statuss"
                        ]}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Studijas;
