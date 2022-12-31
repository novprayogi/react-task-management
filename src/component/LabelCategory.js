import React from "react";

const LabelCategory = ({ title }) => {
  let color = "";
  switch (title) {
    case "UX Designer":
      color = "green";
      break;
    case "UI Designer":
      color = "blue";
      break;
    case "Back End":
      color = "red";
      break;
    case "Front End":
      color = "yellow";
      break;
    default:
      break;
  }
  return <label className={`bg-${color}-100 px-3 py-1 rounded-full font-medium text-green-500 text-sm`}>{title}</label>;
};

export default LabelCategory;
