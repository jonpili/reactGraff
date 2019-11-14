import React from "react";
import ReactDOM from "react-dom";

interface RegisterProps {
  name: string;
  description: string;
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
        <button onClick={() => this.props.onClick('おにぎり', '愛でにぎる')}>レシピの確認</button>
        <div>name: {this.props.name}</div>
        <div>description: {this.props.description}</div>
      </div>
    )
  }
}

interface MainProps {
  chef: string;
}

interface MainState {
  name: string;
  description: string;
}

class Main extends React.Component<MainProps, MainState> {
  constructor(props: Readonly<MainProps>) {
    super(props);
    this.state = {
      name: 'オムライス',
      description: '卵でつつむ'
    };
  }

  handleClick(name: string, description: string) {
    this.setState({
      name: name,
      description: description
    })
  }

  render() {
    return (
      <div>
        <div>chef: {this.props.chef}</div>
        <Register
          name = {this.state.name}
          description = {this.state.description}
          onClick = {(name, description) => this.handleClick(name, description)}
        />
      </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Main chef="Joe" />,
    document.body.appendChild(document.createElement("div")),
  )
})
