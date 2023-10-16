import "../../App.css";
import Query from '../Query/Query'

const Main = () => {
  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-6 p-3">
          <Query />
        </div>
      </div>
    </div>
  );
};

export default Main;