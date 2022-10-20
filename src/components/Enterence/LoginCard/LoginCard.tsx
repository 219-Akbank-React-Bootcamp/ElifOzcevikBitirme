import React, { FC } from "react";
import { Styled } from "./LoginCard.styled";
import { LoginCardProps } from "./LoginCard.types";

const LoginCard: FC<LoginCardProps> = (props) => {
  return (
    <Styled>
      <h1>{props.title}</h1>

      {props.children}
    </Styled>
  );
};

export default LoginCard;
