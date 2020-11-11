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
      type="text"
      {...props}
    />
  );
}

export default styled(Field)``;