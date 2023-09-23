import "../../App.css";
import Query from '../Query/Query'
const Main = () => {
  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-6">
          <div className="card chat-app">
            <Query />
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
                  <li className="clearfix">
                    <div className="message my-message">Hey there! I'm AltSearch</div>
                  </li>
                  <li className="clearfix">
                    <div className="message my-message">Search for some query in the right hand panel and
                      ask questions regarding the topic below</div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix style3">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                  </div>
                  <input type="text" className="form-control" id="qnaquery" placeholder="Enter text here..."></input>
                  <button onclick="sendChat()" type="submit" id="submit"><span className="input-group-text"><i
                    className="fa fa-send"></i></span></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;