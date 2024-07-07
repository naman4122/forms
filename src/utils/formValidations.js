import displayToast from "./displayToast";

const checkFormData = (formObj) => {
  const errorObj = {
    text: "",
    duration: 2000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      // background: "linear-gradient(to right, #00b09b, #96c93d)",
      background: "red",
    },
  };

  if (!formObj?.fieldType || formObj?.fieldType === undefined) {
    errorObj.text = "Please enter field type!";
    return { status: false, error: errorObj };
  } else if (
    !formObj?.label ||
    formObj?.label === undefined ||
    formObj?.label?.trim() === ""
  ) {
    errorObj.text = "Please enter label!";
    return { status: false, error: errorObj };
  } else if (formObj?.fieldType === "dropdown") {
    if (formObj?.options?.length === 0) {
      errorObj.text = "Please add options for dropdown";
      return { status: false, error: errorObj };
    }
  }

  return { status: true };
};

export default checkFormData;
