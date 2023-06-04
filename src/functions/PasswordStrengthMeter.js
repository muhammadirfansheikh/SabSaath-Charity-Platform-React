import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ Password }) => {
  const testResult = zxcvbn(Password);
  console.log(testResult);

  const createPassowrdLable = () => {
    switch (testResult.score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  return (
    <>
      <p className="text-right" style={{color: funcProgressColor()}}>{createPassowrdLable()}</p>
    </>
  );
};

export default PasswordStrengthMeter;