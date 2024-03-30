import React, { Component } from 'react'
import config from "../../../../config.json"

const { SERVER_API } = config;
export class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        todo_name: "",
        status: "Todo",
      }
    }
  }

  handleChange = (e) => {
    const data = { ...this.state.form };
    data[e.target.name] = e.target.value;
    this.setState({
      form: data
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { todo_name, status } = this.state.form;

    this.postTodo({ todo_name, status });
  }

  postTodo = async (data) => {
    const response = await fetch(`${SERVER_API}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      this.props.onSuccess(true);
      alert('Thêm task thành công')
      this.setState({
        form: {
          todo_name: "",
          status: "Todo"
        }
      })
    }
  }

  render() {
    const { todo_name, status } = this.state.form;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <div className='bg-medium'>
            <div className='row'>
              <div className='col-10'>
                <input
                  type="text"
                  className='form-control'
                  id='todo_name'
                  name='todo_name'
                  required
                  onChange={this.handleChange}
                  value={todo_name}
                  placeholder='Mời nhập task...'
                />
              </div>
              <div className='col-2'><button type='submit' className='btn btn-add'>Thêm</button></div>
            </div>
          </div>

          {/* <div>
                        <label htmlFor=''>Tên sản phẩm</label>
                        <input
                            type="text"
                            id='todo_name'
                            name='todo_name'
                            placeholder='Tên task'
                            required
                            onChange={this.handleChange}
                            value={todo_name}
                        />
                    </div> */}



          {/* <div>
                        <label htmlFor=''>Status</label>
                        <input
                            type="text"
                            id='status'
                            name='status'
                            placeholder='Giá sản phẩm'
                            min={0}
                            onChange={this.handleChange}
                            value={status}
                        />
                    </div> */}
          
        </form>
      </div>
    )
    // return (
    //   <div className='bg-medium'> 
    //     <div className='row'>
    //         <div className='col-10'>
    //             <input 
    //             type="text" 
    //             className='form-control' 
    //              id='todo_name'
    //               required
    //              onChange={this.handleChange}
    //              value={todo_name}
    //             placeholder='Mời nhập task'
    //             />
    //         </div>
    //         <div className='col-2'><button className='btn btn-add'>Thêm</button></div>
    //     </div>

    //   </div>
    // )
  }
}

export default TodoAdd
