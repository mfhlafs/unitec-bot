import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message';

const cookies = new Cookies();
class Chatbot extends Component {
    messagesEnd;
    talkInput;
    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.state = {
            messages: [],
            showBot: true
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(queryText) {
        let msg;
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: queryText
                }
            }
        };

        this.setState({ messages: [...this.state.messages, says] });

        const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')});

        if (res.data.fulfillmentMessages) {
            for (let i = 0; i < res.data.fulfillmentMessages.length; i++) {
                msg = res.data.fulfillmentMessages[i];
                says = {
                    speaks: 'bot',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says] });
            }
        }

    };
    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')});
        let msg, says = {};
        if (res.data.fulfillmentMessages) {
            for (let i = 0; i < res.data.fulfillmentMessages.length; i++) {
                msg = res.data.fulfillmentMessages[i];
                let says = {
                    speaks: 'bot',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says] });
            }
        }

    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
        if (this.talkInput) {
            this.talkInput.focus();
        } 

    }
    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: true });
    }
    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: false });
    }
    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            });
        } else {
            return null;
        }
        
    }
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    render() {

        if (this.state.showBot) {

            return (

                <div style={{ minHeight: 500, maxHeight: 470, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray' }}>

                    <nav>

                        <div className="nav-wrapper">

                            <a className="brand-logo">ChatBot</a>

                            <ul id="nav-mobile" className="right hide-on-med-and-down">

                                <li><a onClick={this.hide}>Close</a></li>

                            </ul>

                        </div>

                    </nav>



                    <div id="chatbot" style={{ minHeight: 388, maxHeight: 388, width: '100%', overflow: 'auto' }}>



                        {this.renderMessages(this.state.messages)}

                        <div ref={(el) => { this.messagesEnd = el; }}

                            style={{ float: "left", clear: "both" }}>

                        </div>

                    </div>

                    <div className=" col s12" >

                        <input style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%' }} ref={(input) => { this.talkInput = input; }} placeholder="type a message:" onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />

                    </div>



                </div>

            );

        } else {

            return (

                <div style={{ minHeight: 40, maxHeight: 500, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray' }}>

                    <nav>

                        <div className="nav-wrapper">

                            <a className="brand-logo">ChatBot</a>

                            <ul id="nav-mobile" className="right hide-on-med-and-down">

                                <li><a onClick={this.show}>Show</a></li>

                            </ul>

                        </div>

                    </nav>

                    <div ref={(el) => { this.messagesEnd = el; }}

                        style={{ float: "left", clear: "both" }}>

                    </div>

                </div>

            );

        }

    }

}

export default Chatbot;