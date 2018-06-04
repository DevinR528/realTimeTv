import React from "react";

import InputUrl from "./InputUrl/InputUrl";
import Button from "../../../../atoms/UI/Button/Button";
import Toggle from "../../../../atoms/UI/Toggle/Toggle";
import styles from "./vidInputCont.css";

const VidInputControls = props => {
  return (
    <div className={styles.VideoInput}>
      <InputUrl
        key={props.input.eleConfig.type}
        elementType={props.input.eleConfig.type}
        elementConfig={props.input.eleConfig}
        value={props.input.value}
        changed={props.passchange}
      />
      <Button
        btnType="Success"
        disabled={!props.readyfetch}
        clicked={props.fetchmedia}
      >
        Get
      </Button>
      <div className={styles.ToggleButton}>
        <Toggle clicked={props.togglescreen} default={props.screenopen}>
          Show Screen
        </Toggle>
        <Toggle clicked={props.togglesync} default={props.shouldsync}>
          Sync Videos
        </Toggle>
      </div>
    </div>
  );
};
export default VidInputControls;
