import React from "react";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

function Field(props) {
  return (
    <Button
      type="submit"
      variant="contained"
      {...props}
    >
      {props.label}
    </Button>
  );
}

export default styled(Field)``;