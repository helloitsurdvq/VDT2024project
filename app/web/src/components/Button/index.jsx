import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import classnames from "classnames";
import PropTypes from "prop-types";

const StyledButton = styled(LoadingButton)(() => ({
  borderRadius: 6,
}));

export default function Button({ label, variant = "contained", className, ...otherProps }) {
  return (
    <StyledButton
      {...otherProps}
      variant={variant}
      disableElevation
      className={classnames(
        "normal-case",
        {
          "bg-primary": variant === "contained",
          "rounded-none bg-inherit hover:bg-inherit text-primary": variant === "transparent",
        },
        className
      )}
    >
      {label || otherProps.children}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined", "transparent"]),
  className: PropTypes.string,
  children: PropTypes.node,
};
