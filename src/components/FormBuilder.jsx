import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formHandleActions } from "../store/reducers/mainSlice";
import displayToast from "../utils/displayToast";
import checkFormData from "../utils/formValidations";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import createJSONFile from "../utils/downloadJSON";
import { FaDownload } from "react-icons/fa";

const FormBuilder = () => {
  // fieldType
  // label
  // placeholder
  // required
  const formArr = useSelector((state) => state.formTypesArr);
  const submittedData = useSelector((state) => state.submitData);
  const [optionText, setOptionText] = useState("");
  const [optionsArr, setOptionsArr] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const { addFormObj } = formHandleActions;
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData(submittedData);
  }, [submittedData]);

  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  console.log("formArr", formArr);
  console.log("optionsArr", optionsArr);

  const onFinish = (values) => {
    let isError = false;
    const formObj = values;
    if (!formObj?.required) {
      formObj.required = false;
    }

    if (formObj.fieldType === "dropdown") {
      formObj["options"] = optionsArr;
    }
    const isValid = checkFormData(formObj);
    console.log("isValid", isValid);
    if (!isValid?.status) {
      isError = true;
      displayToast(isValid?.error);
    }

    formObj.id = Date.now();

    console.log("formObj", formObj);

    console.log("isError", isError);
    // Dispatch action with the updated array
    if (!isError) {
      dispatch(addFormObj(formObj));
      displayToast({
        text: "Field added!",
        duration: 2000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          // background: "red",
        },
      });
    }
  };

  const downloadData = () => {
    createJSONFile(formData, "form-data");
  };

  return (
    <div className="flex flex-col items-center px-8 w-1/2">
      <div className="w-[100%] h-fit flex flex-col items-center my-8 bg-gray-100 rounded-lg">
        <span className="text-4xl mx-auto my-5">Create your form</span>

        <Form
          name="control-hooks"
          onFinish={onFinish}
          className="w-[70%] me-14 mt-8"
          {...layout}
        >
          <Form.Item
            name="fieldType"
            label="Field Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select field type"
              onChange={(e) => {
                if (e === "dropdown") {
                  setIsDropdown(true);
                } else {
                  setIsDropdown(false);
                  setOptionsArr([]);
                  setOptionText("");
                }
              }}
              options={[
                {
                  label: "Text",
                  value: "text",
                },
                {
                  label: "Text Area",
                  value: "textarea",
                },
                {
                  label: "Email",
                  value: "email",
                },
                {
                  label: "Radio",
                  value: "radio",
                },
                {
                  label: "Dropdown",
                  value: "dropdown",
                },
              ]}
              allowClear
            />
          </Form.Item>

          {isDropdown && (
            <div className="flex my-4">
              <Input
                type="text"
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
              />

              <div
                className="bg-blue-200 rounded-md mx-3 cursor-pointer"
                onClick={() => {
                  setOptionsArr((prev) => {
                    let tempArr = prev;
                    tempArr.push(optionText);
                    return tempArr;
                  });

                  displayToast({
                    text: "Option added",
                    duration: 2000,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                      // background: "red",
                    },
                  });
                }}
              >
                Add Option
              </div>
            </div>
          )}

          <Form.Item
            name="label"
            label="Label"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="placeholder" label="Placeholder">
            <Input />
          </Form.Item>

          <Form.Item name="required" valuePropName="checked">
            <Checkbox>Required</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Create Field
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div className=" border-2 border-black  w-full flex flex-col bg-black rounded-lg h-fit">
        <div className="flex items-center justify-between">
          <span className="text-3xl my-4 flex mx-4 text-white ">Form Data</span>
          <FaDownload
            className="text-white text-2xl cursor-pointer mx-4"
            onClick={downloadData}
          />
        </div>
        <JsonView
          src={formData}
          className="bg-gray-100 p-8 rounded-bl-lg rounded-br-lg "
        />
      </div>
    </div>
  );
};

export default FormBuilder;
