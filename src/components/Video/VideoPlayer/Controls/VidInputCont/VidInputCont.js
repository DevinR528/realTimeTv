import React, { Component } from "react";

import InputUrl from "./InputUrl/InputUrl";
import Button from "../../../../atoms/UI/Button/Button";
import Toggle from "../../../../atoms/UI/Toggle/Toggle";
import styles from "./vidInputCont.css";

class VidInputControls extends Component {
  // TODO turn InputUrl and Button in to stateful comp to use ref.focus()?

  render(){
    return (
      <div className={styles.VideoInput}>
        <InputUrl
          key={this.props.input.eleConfig.type}
          elementType={this.props.input.eleConfig.type}
          elementConfig={this.props.input.eleConfig}
          value={this.props.input.value}
          changed={this.props.passchange}
        />
        <Button
          btnType="Success"
          disabled={!this.props.readyfetch}
          clicked={this.props.fetchmedia}
        >
          Get
        </Button>
  
        <div className={styles.ToggleButton}>
          <Toggle
            clicked={this.props.togglescreen}
            default={this.props.screenopen}>
            Show Screen
          </Toggle>
          <Toggle
            clicked={this.props.togglesync}
            default={this.props.shouldsync}>
            Sync Videos
          </Toggle>
        </div>
      </div>
    );
  }
  
};
export default VidInputControls;
