import React, { Component } from 'react';
import config from "../../../../config.json";

const { SERVER_API } = config;

class MiniForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        status: "",
      }
    }
  }

  handleChange = (e) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, status } = this.props.todo;
    await this.updateTodoStatus(id, status);
  }

  updateTodoStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${SERVER_API}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
      if (response.ok) {
        this.props.onUpdate();
        alert('Sửa thành công');
      } else {
        throw new Error('Có lỗi xảy ra khi sửa đổi trạng thái.');
      }
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi khi sửa đổi trạng thái.');
    }
  }

  render() {
    const { status } = this.state.form;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select 
            className='form-control' 
            name="status" 
            value={status}
            onChange={this.handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
          <div className='col-2'><button type='submit' className='btn btn-add'>Sửa</button></div>
        </form>
      </div>
    );
  }
}

export default MiniForm;
