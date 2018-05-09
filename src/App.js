import React, { Component } from "react";

import Video from "./Containers/VideoPlayer/Video";
import styles from "./App.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Video />
      </div>
    );
  }
}

export default App;
