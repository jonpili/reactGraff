import React from "react";
import ReactDOM from "react-dom";

interface RegisterProps {
  name: string;
  description: string;
}

class Register extends React.Component<{}, RegisterProps> {  
  render() {
    return (
      <form>
        <div>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea name="description" />
          </label>
        </div>
        <input type="submit" value="Submit" />
        <div>name: {this.props.name}</div>
        <div>description: {this.props.description}</div>
      </form>
    )
  }
}

interface MainProps {
  chef: string;
}

// const Main: React.SFC<MainProps> = props => (
//   <div>Main {props.name}!</div>
// )

class Main extends React.Component<{}, MainProps> {
  render() {
    return (
      <div>
        <div>chef: {this.props.chef}</div>
        <Register
          name = 'ハンバーグ'
          description = '肉をこねる'
        />
      </div>
    )
  }
}

// Main.defaultProps = {
//   chef: "David",
// }

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Main chef="Joe" />,
    document.body.appendChild(document.createElement("div")),
  )
})
