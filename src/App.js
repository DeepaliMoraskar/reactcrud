import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import * as bucketAction from './actions/bucketAction';


class App extends Component {

  constructor(props) {
    super(props);
    this.handleChangeBucket = this.handleChangeBucket.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
    this.handleSubmitBucket = this.handleSubmitBucket.bind(this);
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this);
    this.input = [];
    this.state = {
      bucketName: '',
      toDoName: '',
      updateBucket: '',
      updateTodo: '',
      updateName: '',
      isDisableAddBucket: true,
      isDisableAddTodo: true
    }
  }

  handleChangeBucket(e) {
    if (e.target.value.length > 0) {
      this.setState({
        bucketName: e.target.value,
        isDisableAddBucket: false
      })
    } else {
      this.setState({
        bucketName: e.target.value,
        isDisableAddBucket: true
      })
    }
  }

  handleChangeTodo(e, i) {
    if (e.target.value.length > 0) {
      let dataBucket = this.props.bucket;
      dataBucket[i].isDisableAddTodo = false
      this.props.editBucket(dataBucket);
    } else {
      let dataBucket = this.props.bucket;
      dataBucket[i].isDisableAddTodo = true
      this.props.editBucket(dataBucket);
    }
    this.setState({
      toDoName: e.target.value,
    })
  }

  handleSubmitBucket(e) {
    e.preventDefault();
    if (this.state.bucketName && this.state.bucketName !== "") {
      let dataBucket = this.props.bucket;
      let bucket = {
        bucketName: this.state.bucketName,
        toDo: [],
        show: false,
        isDisableAddTodo: true
      }
      dataBucket.push(bucket);
      this.props.createBucket(dataBucket);
      this.setState({
        bucketName: '',
        isDisableAddBucket: true
      });
    } else {
      this.setState({ isDisableAddBucket: true })
    }
  }

  updateBucket(e, i) {
    let dataBucket = this.props.bucket
    dataBucket[i].bucketName = e.target.value
    this.props.editBucket(dataBucket);
    this.setState({
      updateName: e.target.value,
      updatedBucket: dataBucket
    });
  }

  updateTodo(e, i, bucketIndex) {
    let data = this.props.bucket;
    data[bucketIndex].toDo[i].toDoName = e.target.value
    this.props.editTodo(data);
    this.setState({
      updateTodo: e.target.value,
      updatedTodo: data
    });
  }

  handleSubmitTodo(e, i) {
    if (this.state.toDoName !== "") {
      let dataBucket = this.props.bucket
      dataBucket[i].isDisableAddTodo = true
      let toDo = {
        toDoName: this.state.toDoName,
        show: false,
        isComplete: false
      }
      dataBucket[i].toDo.push(toDo);
      this.props.createTodo(dataBucket);
      this.state.toDoName !== '' ? this.input[i].value = '' : null
      this.setState({
        toDoName: ''
      });
    }
  }

  onEditBucket = (e, bucketIndex) => {
    let data = this.props.bucket;
    data[bucketIndex].show = data[bucketIndex].show ? false : true
    if (data[bucketIndex].show) {
      this.props.editBucket(data);
      this.setState({ bucketBtn: 'SAVE' })
    } else {
      this.setState({ bucketBtn: 'EDIT' })
    }
  }

  onEditTodo = (e, i, bucketIndex) => {
    let data = this.props.bucket;
    data[bucketIndex].toDo[i].show = data[bucketIndex].toDo[i].show ? false : true
    if (data[bucketIndex].toDo[i].show) {
      this.props.editTodo(data);
      this.setState({ toDoBtn: 'fa fa-check-circle fa-2x' })
    } else {
      this.setState({ toDoBtn: 'fa fa-pencil fa-2x' })
    }
  }

  onCompleteTodo = (e, i, bucketIndex) => {
    let data = this.props.bucket;
    data[bucketIndex].toDo[i].isComplete = data[bucketIndex].toDo[i].isComplete ? false : true
    if (data[bucketIndex].toDo[i].isComplete) {
      this.props.editTodo(data);
      this.setState({ inCompleteBtn: 'fa fa-undo fa-2x' })
    } else {
      this.setState({ inCompleteBtn: 'fa fa-list fa-2x' })
    }
  }



  listBucketView(data, index) {
    return (

      <div className="row" key={index}>
        <div className="col-md-2">
          {data.show ?
            <input type="text" id={index} className="form-control" value={data.bucketName} onChange={(e) =>
              this.updateBucket(e, index)} /> :
            <div>
              {data.bucketName}
            </div>
          }
        </div>

        <div className="col-md-2">
          <button onClick={(e) => this.onEditBucket(e, index)} className="btn btn-danger">
            {data.show ? this.state.bucketBtn : 'EDIT'}
          </button>
        </div>
      </div>
    )
  }

  listToDoView(data, index, bucketIndex) {
    return (
      <div className="row listItem" key={index + 1}>
        <div className="col-md-6 toDolistInput">
          {data.show ?
            <input type="text" id={index} className="form-control" value={data.toDoName} onChange={(e) =>
              this.updateTodo(e, index, bucketIndex)} /> :
            <div style={{ textDecoration: data.isComplete ? 'line-through' : 'none' }}>
              {data.toDoName}
            </div>
          }
        </div>

        <div className="col-md-2">
          <i className={data.isComplete ? this.state.inCompleteBtn : 'fa fa-list fa-2x'} aria-hidden="true" onClick={(e) => this.onCompleteTodo(e, index, bucketIndex)}></i>
        </div>

        <div className="col-md-2">
          <i className={data.show ? this.state.toDoBtn : 'fa fa-pencil fa-2x'} aria-hidden="true" onClick={(e) => this.onEditTodo(e, index, bucketIndex)}></i>
        </div>
        <div className="col-md-2">
          <i className="fa fa-trash fa-2x" aria-hidden="true" onClick={(e) => this.deleteTodo(e, index, bucketIndex)}></i>
        </div>
      </div>

    )
  }

  deleteTodo(e, index, bucketIndex) {
    e.preventDefault();
    let data = this.props.bucket;
    let filteredData = data[bucketIndex].toDo.filter((data, i) => i !== index);
    data[bucketIndex].toDo = filteredData
    this.props.deleteTodo(data, index, bucketIndex);
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand">TO-DO</a>
          <form className="form-inline">
            <input type="text" onChange={this.handleChangeBucket} className="form-control mr-sm-2" value={this.state.bucketName} />
            <button type="submit" disabled={this.state.isDisableAddBucket} className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleSubmitBucket}>Add Bucket</button>
          </form>
        </nav>

        {/* <div className="row">
            <div className="col-md-2">
              <input type="text" onChange={this.handleChangeBucket} className="form-control" value={this.state.bucketName} /><br />
            </div>
            <div className="col-md-2">
              <input type="submit" className="btn btn-success" value="ADD BUCKET" onClick={this.handleSubmitBucket} />
            </div>
          </div> */}

        {/* {<ul className="list-group bg2">
            {this.props.bucket && this.props.bucket.map((dataBucket, i) => this.listBucketView(dataBucket, i, 'bucket'))}
          </ul>} */}
        {/* </div> */}



        <div className="container">
          {this.props.bucket && this.props.bucket.length > 0 ?

            <div className="row bucketContainer">
              {this.props.bucket && this.props.bucket.map((dataBucket, bucketIndex) =>

                <div className="row bucket" key={bucketIndex}>
                  <h6>Bucket : {dataBucket.bucketName}</h6>

                  <div className="row toDoContainer">

                    <div className="col-md-8" key={bucketIndex}>
                      <input type="text" onChange={(e) => this.handleChangeTodo(e, bucketIndex)} className="form-control" ref={(input) => this.input[bucketIndex] = input} />
                    </div>
                    <div className="col-md-2">
                      <input type="submit" className="btn btn-success" disabled={dataBucket.isDisableAddTodo} value="Add Todo" onClick={(e) => this.handleSubmitTodo(e, bucketIndex)} />
                    </div>
                  </div>

                  {<ul className="list-group toDolist">
                    {dataBucket.toDo && dataBucket.toDo.map((todo, i) => this.listToDoView(todo, i, bucketIndex))}
                  </ul>}
                </div>

              )}
            </div> : <div className="row addBucketMsg"><i className="fa fa-plus fa-2x" aria-hidden="true"></i><p className="bucketMsgP">Add New Bucket using Add Bucket Button</p></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bucket: state.data.bucket,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: toDo => dispatch(bucketAction.createTodo(toDo)),
    deleteTodo: (index, bucketIndex) => dispatch(bucketAction.deleteTodo(index, bucketIndex)),
    createBucket: bucket => dispatch(bucketAction.createBucket(bucket)),
    editBucket: bucket => dispatch(bucketAction.editBucket(bucket)),
    editTodo: toDo => dispatch(bucketAction.editTodo(toDo)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
