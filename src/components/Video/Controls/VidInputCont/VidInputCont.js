import React from "react";

import InputUrl from "./InputUrl/InputUrl";
import Button from "../../../atoms/UI/Button/Button";
import styles from "./vidInputCont.css";

const VidInputControls = props => {
  return (
    <div className={styles.VideoInput}>
      <InputUrl
        key={props.input.eleConfig.type}
        elementType={props.input.eleConfig.type}
        elementConfig={props.input.eleConfig}
        value={props.input.value}
        changed={props.passChange}
      />
      <Button disabled={props.readyFetch} clicked={props.fetchMedia}>
        Get
      </Button>
      <Button clicked={props.toggleScreen}>Toggle</Button>
    </div>
  );
};
export default VidInputControls;
