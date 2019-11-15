import React from "react";
import ReactDOM from "react-dom";
import './hello_react.css';
import axios from 'axios';

import Logo from './logo.png';

interface RegisterProps {
  onClick: (name: string, description: string) => void;
}

interface RegisterState {
  name: string;
  description: string;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: Readonly<RegisterProps>) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }
  
  handleSubmit(event: { preventDefault: () => void; }) {
    axios.post('http://localhost:3000/posts', {
      name: this.state.name,
      description: this.state.description
    })
    .then((result) => {
      console.log(result)
      this.props.onClick(this.state.name, this.state.description)
      this.setState({name: '', description: ''});
    })
    .catch((data) => {
      console.log(data)
    })
    event.preventDefault();
  }

  handleChangeName(event: { target: { value: any; }; }) {
    this.setState({name: event.target.value});
  }

  handleChangeDescription(event: { target: { value: any; }; }) {
    this.setState({description: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            料理名：
            <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>
        </div>
        <div>
          <label>
            作り方：
            <textarea value={this.state.description} onChange={this.handleChangeDescription} />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

interface RecipeListProps {
  recipes: {name: string, description: string}[];
}

class RecipeList extends React.Component<RecipeListProps, {}> {
  render() {
    return (
      <div>
        <table>
          <thead>
          <tr><th>料理名</th><th>作り方</th></tr>
          </thead>
          <tbody>
          {this.props.recipes.map((recipe, index) => {
            return <tr key={index}><td>{recipe.name}</td><td>{recipe.description}</td></tr>;
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

interface MainProps {
  chef: string;
}

interface MainState {
  recipes: {name: string, description: string}[];
}

class Main extends React.Component<MainProps, MainState> {
  constructor(props: Readonly<MainProps>) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  handleClick(name: string, description: string) {
    this.setState({
      recipes: this.state.recipes.concat(
        {
          name: name,
          description: description
        }
      )
    })
  }

  render() {
    return (
      <div className="main">
        <div className="register">
          <img src={Logo} alt="ロゴ" width="196"/>
          <div className="chef">
            作成者： {this.props.chef}
          </div>
          <Register
            onClick = {(name, description) => this.handleClick(name, description)}
          />
        </div>
        <div className="recipe-list">
          <RecipeList
            recipes = {this.state.recipes}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts')
    .then((results) => {
      console.log(results)
      this.setState({recipes: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Main chef="Joe" />,
    document.body.appendChild(document.createElement("div")),
  )
})
