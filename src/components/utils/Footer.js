import React, {Component} from 'react';

import './Footer.scss';

class Footer extends Component{
    
    render()
    {
        return(
        <div className="Footer">
            <hr className="footerLine"/>
            <span className="tt">Tīmekļa tehnoloģijas 2019</span><br/>
            <span className="ks">Klāvs Spruģevics</span><br/>
            <span className="gads">2019</span>

        </div>
        );
    }
}

export default Footer;
