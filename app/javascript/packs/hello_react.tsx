import React from "react";
import ReactDOM from "react-dom";

interface HelloProps {
  name: string;
}

// const Hello: React.SFC<HelloProps> = props => (
//   <div>Hello {props.name}!</div>
// )

class Hello extends React.Component<{}, HelloProps> {
  render() {
    return (
      <div>Hello {this.props.name}!</div>
    )
  }
}

Hello.defaultProps = {
  name: "David",
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement("div")),
  )
})
