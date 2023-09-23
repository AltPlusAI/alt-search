import axios from 'axios';
import { useState, useEffect } from 'react';
import "../../App.css";

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
    const sessionId = cookiesObject.sessionid;
    const [search, setSearch] = useState('');
    const [text, setText] = useState('');
    const [json, setJson] = useState('');
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });
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
                <li class="clearfix" id="list0" onclick="selectLink(this.id,'0')">
                    <div class="about">
                        <div class="name" id="name0"> <a href={json['url0']}>{json['url1']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>
                    </div>
                </li>
                <li class="clearfix" id="list1" onclick="selectLink(this.id,'1')">
                    <div class="about">
                        <div class="name" id="name1"> <a href={json['url2']}>{json['url3']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>
                    </div>
                </li>
                <li class="clearfix" id="list2" onclick="selectLink(this.id,'2')">
                    <div class="about">
                        <div class="name" id="name2"><a href={json['url4']}>{json['url5']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>
                    </div>
                </li>
                <li class="clearfix" id="list3" onclick="selectLink(this.id,'3')">
                    <div class="about">
                        <div class="name" id="name3"><a href={json['url6']}>{json['url7']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>
                    </div>
                </li>
                <li class="clearfix" id="list4" onclick="selectLink(this.id,'4')">
                    <div class="about">
                        <div class="name" id="name4"><a href={json['url8']}>{json['url9']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>
                    </div>
                </li>
                <li class="clearfix" onclick="selectLink(this.id,'5')">
                    <div class="about">
                        <div class="name" ><a href={json['url10']}>{json['url11']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
                <li class="clearfix" onclick="selectLink(this.id,'5')">
                    <div class="about">
                        <div class="name" id="name5"><a href={json['url12']}>{json['url13']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
                <li class="clearfix" onclick="selectLink(this.id,'5')">
                    <div class="about">
                        <div class="name" ><a href={json['url14']}>{json['url15']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
                <li class="clearfix" onclick="selectLink(this.id,'5')">
                    <div class="about">
                        <div class="name" ><a href={json['url16']}>{json['url17']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
                <li class="clearfix" onclick="selectLink(this.id,'5')">
                    <div class="about">
                        <div class="name" ><a href={json['url18']}>{json['url19']}</a></div>
                        <div class="status"> <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
            </ul>
            <div className="input-group ">
                <div className="input-group-prepend">
                    <button id="selectbtn" type="submit" onclick="sendUrl(urllist)"> <span
                        class="input-group-text"><i class="fa fa-list-alt"> Select and
                            Summarize</i></span></button>
                </div>
            </div>
        </div>
    );
};

export default Query;