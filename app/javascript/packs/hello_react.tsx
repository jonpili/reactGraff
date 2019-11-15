import React from "react";
import ReactDOM from "react-dom";
import './hello_react.css';
import axios from 'axios';

import Logo from './logo.png';

interface RegisterProps {
  onClick: (name: string, description: string) => void;
}

class Register extends React.Component<RegisterProps, {}> {
  render() {
    return (
      // <form>
      //   <div>
      //     <label>
      //       Name:
      //       <input type="text" name="name" />
      //     </label>
      //   </div>
      //   <div>
      //     <label>
      //       Description:
      //       <textarea name="description" />
      //     </label>
      //   </div>
      //   <input type="submit" value="Submit" />
      //   <button value="confirm" onClick={() => this.props.onClick('おにぎり', '愛でにぎる')}>レシピの確認</button>
      //   <div>name: {this.props.name}</div>
      //   <div>description: {this.props.description}</div>
      // </form>
      <div>
        <button onClick={() => this.props.onClick('おにぎり', '愛でにぎる')}>レシピの追加</button>
      </div>
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
          <div>
            chef: {this.props.chef}
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
    axios.get('http://localhost:3000/posts/getData')
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
