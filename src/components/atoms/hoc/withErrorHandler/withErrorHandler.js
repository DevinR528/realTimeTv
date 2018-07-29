import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: null,
    info: "",
    error: ""
  };

  componentDidCatch(err, errInfo) {
    this.setState({
      hasError: true,
      errorInfo: errInfo,
      error: err
    });

    console.log(`Error: ${err}`);
    console.log(`ErrorInfo: ${JSON.stringify(errInfo)}`);
  }

  render() {
    return this.state.hasError ? (
      <div>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
