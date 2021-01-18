import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as bucketAction from './actions/bucketAction';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChangeBucket = this.handleChangeBucket.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
    this.handleSubmitBucket = this.handleSubmitBucket.bind(this);
    this.handleSubmitTodo = this.handleSubmitTodo.bind(this);

    this.state = {
      bucketName: '',
      toDoName: '',
      updateBucket: '',
      updateTodo: '',
      updateName: '',
    }
  }

  handleChangeBucket(e) {
    this.setState({
      bucketName: e.target.value
    })
  }

  handleChangeTodo(e) {
    this.setState({
      toDoName: e.target.value
    })
  }

  handleSubmitBucket(e) {
    e.preventDefault();
      if(this.state.bucketName) {
      let dataBucket = this.props.bucket;
      let bucket = {
        bucketName: this.state.bucketName,
        toDo: [],
        show: false
      }
      dataBucket.push(bucket);
      this.props.createBucket(dataBucket);
      this.setState({
        bucketName: ''
      });
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
    if(this.state.toDoName!="") {
      let dataBucket = this.props.bucket
      let toDo = {
        toDoName: this.state.toDoName,
        show: false,
        isComplete: false
      }
      dataBucket[i].toDo.push(toDo);
      this.props.createTodo(dataBucket);
      this.state.toDoName !== '' ? this.input.value = '' : null
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
      this.setState({ toDoBtn: 'SAVE' })
    } else {
      this.setState({ toDoBtn: 'EDIT' })
    }
  }

  onCompleteTodo = (e, i, bucketIndex) => {
    let data = this.props.bucket;
    data[bucketIndex].toDo[i].isComplete = data[bucketIndex].toDo[i].isComplete ? false : true
    if (data[bucketIndex].toDo[i].isComplete) {
      this.props.editTodo(data);
      this.setState({ inCompleteBtn: 'In Complete' })
    } else {
      this.setState({ inCompleteBtn: 'Complete' })
    }
  }



  listBucketView(data, index) {
    return (
      <div className="row" key={index}>
        <div className="col-md-10">
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
      <div className="row" key={index + 1}>
        <div className="col-md-6">
          {data.show ?
            <input type="text" id={index} className="form-control" value={data.toDoName} onChange={(e) =>
              this.updateTodo(e, index, bucketIndex)} /> :
            <div style={{textDecoration: data.isComplete ? 'line-through' : 'none'}}>
              {data.toDoName}
            </div>
          }
        </div>

        <div className="col-md-2">
          <button onClick={(e) => this.onCompleteTodo(e, index, bucketIndex)} className="btn btn-danger">
            {data.isComplete ? this.state.inCompleteBtn : 'Complete'}
          </button>
        </div>

        <div className="col-md-2">
          <button onClick={(e) => this.onEditTodo(e, index, bucketIndex)} className="btn btn-danger">
            {data.show ? this.state.toDoBtn : 'EDIT'}
          </button>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteTodo(e, index, bucketIndex)} className="btn btn-danger">
            Remove
          </button>
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
      <div className="container">
        <h1>Clientside Contacts Application</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
          <div className="row">
            <div className="col-md-10">
              <input type="text" onChange={this.handleChangeBucket} className="form-control" value={this.state.bucketName} /><br />
            </div>
            <div className="col-md-2">
              <input type="submit" className="btn btn-success" value="ADD BUCKET" onClick={this.handleSubmitBucket} />
            </div>
          </div>
          <hr />
          {<ul className="list-group">
            {this.props.bucket && this.props.bucket.map((dataBucket, i) => this.listBucketView(dataBucket, i, 'bucket'))}
          </ul>}
        </div>
        {this.props.bucket && this.props.bucket.length > 0 ?
          <div>
            {this.props.bucket && this.props.bucket.map((dataBucket, bucketIndex) =>
              <div key={bucketIndex}>
                <h3>{dataBucket.bucketName}</h3>
                <div className="row">
                  <div className="col-md-10">
                    <input type="text" onChange={(e) => this.handleChangeTodo(e)} className="form-control" ref={(input) => this.input = input} /><br />
                  </div>
                  <div className="col-md-2">
                    <input type="submit" className="btn btn-success" value="ADD TODO" onClick={(e) => this.handleSubmitTodo(e, bucketIndex)} />
                  </div>
                </div>
                <hr />
                {<ul className="list-group">
                  {dataBucket.toDo && dataBucket.toDo.map((todo, i) => this.listToDoView(todo, i, bucketIndex))}
                </ul>}
              </div>)}
          </div> : ''}
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
