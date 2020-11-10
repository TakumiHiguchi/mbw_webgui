import React from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

function Field(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      name="artist"
      label={props.label}
      type="text"
      id={props.id}
      style={props.style}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default styled(Field)``;