import React from "react";

import InputUrl from "./InputUrl/InputUrl";
import Button from "../../../../atoms/UI/Button/Button";
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
      <Button disabled={!props.readyfetch} clicked={props.fetchmedia}>
        Get
      </Button>
      <Button clicked={props.togglescreen}>Toggle</Button>
      <Button clicked={props.togglesynced}>
        {props.shouldsync ? "Sync is On" : "Sync is Off"}
      </Button>
    </div>
  );
};
export default VidInputControls;
