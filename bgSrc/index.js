import React from 'react';
import ReactDOM from 'react-dom';

console.clear();

const Title = () => {
  return (
    <div>
       <div>
          <h1>BG ToDo List</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <div className="todoInput">
      <input id="todoItem" name="todoItem" ref={node => {
        input = node;
      }} required />
      <button className="button1" onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li onClick={() => {remove(todo.id)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul className="todoLists">{todoNode}</ul>);
}

// Container Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    if(val){
      const todo = {text: val, id: window.id++}
      // Update data
      this.state.data.push(todo);
      // Update state
      this.setState({data: this.state.data});
    }else{
      alert("Enter Item Name");
    }
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }
 
  render(){
    // Render JSX
    return (
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('container'));



