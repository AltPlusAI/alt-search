import axios from 'axios';
import { useState, useEffect } from 'react';
import "../../App.css";
import 'react-chat-elements/dist/main.css'
import { MessageList } from "react-chat-elements"
import { MessageBox } from "react-chat-elements"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const Query = () => {
    const cookies = document.cookie;
    const cookiesObject = cookies.split(';').reduce((obj, cookie) => {
        const [name, value] = cookie.split('=');
        obj[name] = value;
        return obj;
    }, {});

    const csrf = cookiesObject.csrftoken
    const [search, setSearch] = useState('');
    const [qna, setQna] = useState('');
    const [textqna, setTextQna] = useState('');
    const [text, setText] = useState('');
    const [json, setJson] = useState('');
    const [links, setLinks] = useState([]);
    const [link, setLink] = useState('');

    // Chat messages
    const [messages, setMessages] = useState([
        // Initialize with some initial messages
        {
            position: "left",
            type: "text",
            title: "AltSearch",
            text: "Give me a message list example !",
        },
        {
            position: "right",
            type: "text",
            title: "You",
            text: "That's all.",
        },
    ]);

    // Add a function to add new messages
    const addMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
    };

    const handleSendMessage = (msg, title, pos) => {
        const newMessage = {
            text: msg,
            title: title,
            type: 'text',
            position: pos,
        };

        addMessage(newMessage);
    };
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });
    // Adds links to a variable and sets the value of links
    function selectLink() {
        links.push(link);
        console.log(links)
    }

    function sendSelectedLinks(e) {
        e.preventDefault();
        console.log(link)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        }
        client.post(
            "/url",
            {
                text: link,
                max_words: 100
            },
            {
                headers: headers
            }
        ).then(function (res) {
            setLink([])
            handleSendMessage(res.data['summary'], 'Alt Search', 'left')
        });
    }

    function getQnaResults(e) {
        e.preventDefault();
        setText(`${qna}`)
        handleSendMessage(text, 'You','right')
        setQna('') //empty qna
        console.log(messages)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        }
        client.post(
            "/qnaResults",
            {
                text: String(text),
                max_words: 100
            },
            {
                headers: headers
            }
        ).then(function (res) {
            
            handleSendMessage(res.data['summary'], 'Alt Search','left')
        });
    }

    function getResults(e) {    
        e.preventDefault();
        setText(`${search}`)
        console.log(csrf)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        }
        client.post(
            "/searchResults",
            {
                text: String(text),
                max_words: 100
            },
            {
                headers: headers
            }
        ).then(function (res) {
            setJson(res.data)
            console.log(json['url0']);
        });
    }
    return (
        <div className="card chat-app">
            <div id="plist" class="people-list">
                <div className="input-group style1">
                    <div className="input-group-prepend">
                        <button id="searchbtn" type="submit"
                            onClick={getResults}>
                            <span className="input-group-text">
                                <i className="fa fa-search"></i>
                            </span>
                        </button>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        id="searchquery"
                        name="Search Query"
                        value={search}
                        placeholder="Search Query here"
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0" id="searchlist">
                    <li class="clearfix" id="list0" onClick={() => { setLink(json['url0']); }}>
                        <div class="about">
                            <div class="name" id="name0"> <a href={json['url0']}>{json['url1']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix" id="list1" onClick={() => { setLink(json['url2']); }}>
                        <div class="about">
                            <div class="name" id="name1"> <a href={json['url2']}>{json['url3']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix" id="list2" onClick={() => { setLink(json['url4']); }}>
                        <div class="about">
                            <div class="name" id="name2"><a href={json['url4']}>{json['url5']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix" id="list3" onClick={() => { setLink(json['url6']); }}>
                        <div class="about">
                            <div class="name" id="name3"><a href={json['url6']}>{json['url7']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix" id="list4" onClick={() => { setLink(json['url8']); }}>
                        <div class="about">
                            <div class="name" id="name4"><a href={json['url8']}>{json['url9']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix" onClick={() => { setLink(json['url10']); }}>
                        <div class="about">
                            <div class="name" ><a href={json['url10']}>{json['url11']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>
                    <li class="clearfix" onClick={() => { setLink(json['url12']); }}>
                        <div class="about">
                            <div class="name" id="name5"><a href={json['url12']}>{json['url13']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>
                    <li class="clearfix" onClick={() => { setLink(json['url14']); }}>
                        <div class="about">
                            <div class="name" ><a href={json['url14']}>{json['url15']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>
                    <li class="clearfix" onClick={() => { setLink(json['url16']); }}>
                        <div class="about">
                            <div class="name" ><a href={json['url16']}>{json['url17']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>
                    <li class="clearfix" onClick={() => { setLink(json['url18']); }}>
                        <div class="about">
                            <div class="name" ><a href={json['url18']}>{json['url19']}</a></div>
                            <div class="status"> <i class="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="input-group ">
                    <div className="input-group-prepend">
                        <button id="selectbtn" type="submit" onClick={sendSelectedLinks}> <span
                            class="input-group-text"><i class="fa fa-list-alt"> Select and
                                Summarize</i></span></button>
                    </div>
                </div>
            </div>
            <div className="chat">
                <div className="chat-header clearfix style2">
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">

                            </a>
                            <div className="chat-about">
                                <h6 className="m-b-0">ALT Search </h6>
                                <small>Your search helper</small>
                            </div>
                        </div>
                        <div className="col-lg-6 hidden-sm text-right">
                            <a href="javascript:void(0);" className="btn btn-outline-secondary"><i
                                className="fa fa-camera"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary"><i
                                className="fa fa-image"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-info"><i
                                className="fa fa-cogs"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-warning"><i
                                className="fa fa-question"></i></a>
                        </div>
                    </div>
                </div>
                <div className="chat-history">
                    <ul className="m-b-0" id="chatlist">
                        <MessageList
                            className='message-list'
                            lockable={true}
                            toBottomHeight={'100%'}
                            dataSource={messages}
                        />
                    </ul>
                </div>
                <div className="chat-message clearfix style3">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                        </div>
                        <input
                            type="text"
                            className='form-control'
                            id="searchquery"
                            name="Search Query"
                            value={qna}
                            placeholder="Search Query here"
                            onChange={(event) =>
                                setQna(event.target.value)
                            }
                        />
                        <button onClick={getQnaResults} type="submit" id="submit"><span className="input-group-text"><i
                            className="fa fa-send"></i></span></button>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Query;