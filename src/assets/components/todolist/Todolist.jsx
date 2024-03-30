import React, { Component } from 'react'
import TodoAdd from './TodoAdd'
import config from "../../../../config.json"
import MiniForm from './MiniForm';




const { SERVER_API } = config;

export class Todolist extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      isLoading: true,
      todoId: null,
      showList: false,
      toggle: {
        isShow: false,
      },
      newStatus: '',
    }

  }

  getTodos = async () => {
    const response = await fetch(`${SERVER_API}/todos`);
    if (response.ok) {
      const todos = await response.json();
      this.setState({
        todos: todos,
        isLoading: false
      })
    }
  }

  deleteTodo = async (id) => {
    const response = await fetch(`${SERVER_API}/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      this.getTodos();
    }
  }

  handleClickTodo = (id) => {
    this.setState({
      todoId: id,
      showList: false
    })
  }

  handleBack = () => {
    this.setState({
      showList: true,
    })
  }

  handleAddSuccess = (status) => {
    if (status) {
      this.getTodos();
    }
  }

  handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa không')) {
      this.deleteTodo(id);
      alert('Xóa thành công');
    }
  }
  handleEditTask = (id) => {
    const newName = prompt("Nhập tên mới cho công việc:");
    if (newName === "") {
      alert("Bạn cần phải nhập liệu");
    }
    else if (newName !== null) {
      // Nếu người dùng không hủy bỏ prompt
      this.updateTodoName(id, newName);
    }
  }

  // handleEditStatus = (id) => {
  //   const newStatus = prompt("Sửa trạng thái cho công việc");
  //   if (newStatus === "") {
  //     alert("Bạn cần phải nhập liệu");
  //   }
  //   else if (newStatus !== null) {
  //     // Nếu người dùng không hủy bỏ prompt
  //     this.updateTodoStatus(id, newStatus);
  //   }
  // }

  handleEditStatus = (id) => {
    // Hiển thị dropdown select thay vì sử dụng prompt
    this.setState({
      todoId: id,
      showList: false,
    });
  }

  handleStatusChange = (event) => {
    this.setState({ newStatus: event.target.value });
  }

  updateTodoName = async (id, newName) => {
    const response = await fetch(`${SERVER_API}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo_name: newName,
      })
    });
    if (response.ok) {
      this.getTodos();
      alert('Sửa thành công');
    }
  }

  // updateTodoStatus = async (id, newStatus) => {
  //   const response = await fetch(`${SERVER_API}/todos/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       status: newStatus,
  //     })
  //   });
  //   if (response.ok) {
  //     this.getTodos();
  //     alert('Sửa thành công');
  //   }
  // }

  updateTodoStatus = async (id) => {
    const { newStatus } = this.state;
    if (newStatus === "") {
      alert("Bạn cần phải chọn trạng thái mới cho công việc");
    } else {
      const response = await fetch(`${SERVER_API}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus,
        })
      });
      if (response.ok) {
        this.getTodos();
        // alert('Sửa thành công');
      }
    }
  }

  handleToggle = () => {
    const toggle = { ...this.state.toggle };
    if (toggle.isShow) {
      toggle.isShow = false;
    } else {
      toggle.isShow = true;
    }


    this.setState({
      toggle: toggle
    })
  }




  componentDidMount = () => {
    this.getTodos();
  }

  render() {

    const { todos, isLoading, todoId } = this.state;
    const { isShow } = this.state.toggle;

    const tableStyle = (status) => {
      switch (status) {
        case 'Todo':
          return 'table-secondary';
        case 'Pending':
          return 'table-warning';
        case 'Doing':
          return 'table-primary';
        case 'Done':
          return 'table-success';
        default:
          return '';
      }
    }

    return (
      <div className='' >
        {
          <div className='p-5 bg'>
            <h1 style={{ color: 'white' }}>TODO LIST</h1>
            <hr />
            <TodoAdd onSuccess={this.handleAddSuccess} />
            <br />
            <table class="table">
              <thead className='table-success'>
                <tr>
                  <th width="10%" scope="col" >STT</th>
                  <th scope="col">Tasks</th>
                  <th width="25%" scope="col">Trạng thái</th>
                  <th width="15%" scope="col">Options</th>
                </tr>
              </thead>
              {
                todos.map((todo, index) =>
                  <>
                    {/* <h3>{todo.todo_name}</h3>
                <p>Trạng thái: {todo.status}</p>
                <button type='button' onClick={(e) => {
                    e.stopPropagation();
                    this.handleDelete(todos.id)
                }}>Xóa</button> */}
                    <tbody>

                      <tr className={tableStyle(todo.status)}>

                        {/* <tr className={getRowClass(todo.status)}> */}

                        {/* th số thứ tự */}
                        {/* <th className='pt-3 w-w' scope="row"><p className='w2'>{index + 1}</p></th> */}
                        <th className='pt-3 w-w' scope="row"><p className='w2'>{index + 1}</p></th>

                        <td className='pt-4 w-w'><p className='w2'>{todo.todo_name}</p></td>

                        {/* <td className='w-w'>
                          <p className='w2'>
                            <button className='btn btn-light' onClick={(e) => {
                              e.stopPropagation();
                              this.handleEditStatus(todo.id)
                            }}>
                              {todo.status}
                            </button>
                          </p>
                        </td> */}

                        <td className='w-w'>
                      
                          <div className='w2 d-flex align-items-center'>
                            <select className='form-control' value={todo.status} onChange={this.handleStatusChange}>
                              <option value="Todo">Todo</option>
                              <option value="Pending">Pending</option>
                              <option value="Doing">Doing</option>
                              <option value="Done">Done</option>
                            </select>
                            <button className='btn ' onClick={() => this.updateTodoStatus(todo.id)}>
                            <img className='icon' src="../../../../public/save.png" alt="" />
                          </button> 
                          </div>
                        </td>

                        {/* <td>
                          <button className='btn btn-light' onClick={() => this.updateTodoStatus(todo.id)}>
                            Lưu
                          </button>
                        </td> */}

                        {/* MINI FROM PLAN */}
                        {/* <td className='pt-3 w-w'>
                          <p className='w2'>
                            <button className='btn btn-light' onClick={this.handleToggle}>
                              {todo.status}
                            </button>
                            <div className={`border my-5 p-3 content${isShow ? ' show' : ''}`}>
                            <MiniForm  onSuccess={this.handleAddSuccess} />
                            </div>  
                           
                          </p>
                        </td> */}

                        <td>
                          <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-light" onClick={(e) => {
                              e.stopPropagation();
                              this.handleEditTask(todo.id)
                            }}>
                              <img src="../../../../public/edit.png" className='icon' alt="" />
                            </button>
                            <button type="button" class="btn btn-light" onClick={(e) => {
                              e.stopPropagation();
                              this.handleDelete(todo.id)
                            }}>
                              <img src="../../../../public/delete.png" className='icon' alt="" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    </tbody>
                  </>


                )}</table>




          </div>}

      </div>
    )

    // const {todos} = this.state;
    // return (

    //   <div className='p-5 bg '>
    //     <h1 style={{ color: 'white' }}>TODO LIST</h1>
    //     <hr />
    //     <TodoAdd />
    //     <br />
    //     <table class="table">
    //       <thead>
    //         <tr>
    //           <th scope="col">#</th>
    //           <th scope="col">Tên task</th>
    //           <th scope="col">Trạng thái</th>
    //           <th scope="col"></th>
    //         </tr>
    //       </thead>
    //       <tbody>

    //         <tr >
    //           <th scope="row">1</th>
    //           <td>{todos.todo_name}</td>
    //           <td></td>
    //           <td>
    //             <div class="btn-group" role="group" aria-label="Basic example">
    //               <button type="button" class="btn btn-warning">Sửa</button>
    //               <button type="button" class="btn btn-danger">Xóa</button>
    //             </div>
    //           </td>
    //         </tr>

    //       </tbody>
    //     </table>
    //   </div>
    // )
  }
}

export default Todolist
