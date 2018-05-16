import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: null,
    info: "",
    error: ""
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, info, error });

    console.log(`Error: ${error}`);
    console.log(`ErrorInfo: ${JSON.stringify(info)}`);
  }

  render() {
    return this.state.hasError ? (
      <p>Something went Wrong</p>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
