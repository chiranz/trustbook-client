import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

export default function MyButton({
  title,
  btnClassName,
  tipClassName,
  children,
  handleClick,
}) {
  return (
    <Tooltip title={title} placement="top" className={tipClassName}>
      <IconButton
        onClick={handleClick}
        color="primary"
        className={btnClassName}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}
