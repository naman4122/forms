import { Button, Form, Input, Radio, Select, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { formHandleActions } from "../store/reducers/mainSlice";
import displayToast from "../utils/displayToast";

function setUndefinedToNull(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      obj[key] = null;
    }
  });
  return obj;
}

const DisplayForm = () => {
  let formArr = useSelector((state) => state.formTypesArr);
  const dispatch = useDispatch();
  const { addFormObj, removeElement, addSubmittedData } = formHandleActions;

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const onDelete = (id) => {
    console.log("id", id);
    formArr = formArr.filter((i) => i?.id !== id);
    dispatch(removeElement(formArr));
  };

  const onFinish = (values) => {
    values = setUndefinedToNull(values);
    console.log("values", values);
    dispatch(addSubmittedData(values));
    // setFormData(values);
    displayToast({
      text: "Form Submitted Successfully!",
      duration: 2000,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        // background: "red",
      },
    });
  };

  return (
    <div className="flex  h-full flex-col w-1/2 pe-8">
      <div className="bg-gray-100 shadow-lg w-full me-8 my-8 flex flex-col items-center min-h-[630px] h-full rounded-lg">
        <span className="text-4xl my-5">Dynamic Form</span>
        <Form
          {...layout}
          name="dyanic-form"
          onFinish={onFinish}
          className="w-[70%] me-16 mt-8  rounded-lg mb-4"
        >
          {formArr.map((item) => {
            if (item?.fieldType === "text") {
              return (
                <div className="flex w-full  justify-center ">
                  <Form.Item
                    label={item?.label}
                    name={item?.label}
                    key={item?.id}
                    className="w-full"
                    rules={[
                      {
                        required: item?.required,
                        // pattern:
                        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$])[a-zA-Z\d@!#$]{8,15}$/,
                        // message:
                        //   "Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, and one special character (@!#$).",
                      },
                    ]}
                  >
                    <Input placeholder={item?.placeholder || ""} />
                  </Form.Item>
                  <span className="text-3xl h-fit  cursor-pointer ">
                    <MdDelete onClick={() => onDelete(item?.id)} />
                  </span>
                </div>
              );
            }

            if (item?.fieldType === "textarea") {
              return (
                <div className="flex w-full  justify-center ">
                  <Form.Item
                    className="w-full  "
                    label={item?.label}
                    name={item?.label}
                    key={item?.id}
                    rules={[
                      {
                        required: item?.required,
                      },
                    ]}
                  >
                    <Input.TextArea placeholder={item?.placeholder || ""} />
                  </Form.Item>
                  <span className="text-3xl h-fit  cursor-pointer ">
                    <MdDelete onClick={() => onDelete(item?.id)} />
                  </span>
                </div>
              );
            }

            if (item?.fieldType === "email") {
              return (
                <div className="flex w-full  justify-center ">
                  <Form.Item
                    className="w-full"
                    label={item?.label}
                    rules={[
                      {
                        required: item?.required,
                        type: "email",
                      },
                    ]}
                    key={item?.id}
                    name={item?.label}
                  >
                    <Input />
                  </Form.Item>
                  <span className="text-3xl h-fit  cursor-pointer ">
                    <MdDelete onClick={() => onDelete(item?.id)} />
                  </span>
                </div>
              );
            }

            if (item?.fieldType === "radio") {
              return (
                <div className="flex w-full  justify-center ">
                  <Form.Item
                    key={item?.id}
                    name={item?.label}
                    valuePropName="checked"
                    className="w-full"
                    rules={[
                      {
                        required: item?.required,
                      },
                    ]}
                  >
                    <Radio value={true} required={item?.required}>
                      {item?.label}
                    </Radio>
                  </Form.Item>
                  <span className="text-3xl h-fit  cursor-pointer ">
                    <MdDelete onClick={() => onDelete(item?.id)} />
                  </span>
                </div>
              );
            }

            if (item?.fieldType === "dropdown") {
              return (
                <div className="flex w-full  justify-center ">
                  <Form.Item
                    label={item?.label}
                    key={item?.id}
                    name={item?.label}
                    className="w-full"
                    rules={[
                      {
                        required: item?.required,
                      },
                    ]}
                  >
                    <Select
                      placeholder={item?.placeholder}
                      options={item?.options.map((i) => {
                        return {
                          value: i?.trim(),
                          label: i?.trim(),
                        };
                      })}
                    />
                  </Form.Item>
                  <span className="text-3xl h-fit  cursor-pointer ">
                    <MdDelete onClick={() => onDelete(item?.id)} />
                  </span>
                </div>
              );
            }
          })}

          {formArr?.length !== 0 && (
            <Form.Item
              wrapperCol={{
                offset: 5,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit Form
                </Button>
              </Space>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default DisplayForm;
