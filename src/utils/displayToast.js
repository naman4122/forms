import Toastify from "toastify-js";

const displayToast = ({ text, duration, gravity, position, style }) => {
  return Toastify({
    text,
    duration,
    gravity, // `top` or `bottom`
    position, // `left`, `center` or `right`
    style,
  }).showToast();
};

export default displayToast;
