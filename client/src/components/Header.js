import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
    <nav>
        
        <div className="#43a047 green darken-1" >
            <Link to={'/'} className="#43a047 green darken-1">Unitec</Link>
            <ul id="nav-mobile" className="right #43a047 green darken-1">
            
                <li><Link to={'/moodle'}>Moodle</Link> </li>
                <li><Link to={'/about'}>About Unitec</Link> </li>
            </ul>
            </div>
       
        </nav>
        
            
    )
            
export default Header;