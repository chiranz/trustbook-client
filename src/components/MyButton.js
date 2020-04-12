import React, { useRef } from "react";
import { Tooltip, IconButton } from "@material-ui/core";

export default function MyButton({
  title,
  btnClassName,
  tipClassName,
  children,
  handleClick,
  btnColor,
}) {
  const iconRef = useRef();
  return (
    <Tooltip title={title} placement="top" className={tipClassName}>
      <IconButton
        ref={iconRef}
        onClick={handleClick}
        color={btnColor}
        className={btnClassName}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}
