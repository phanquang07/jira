import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectCategoryAction } from "../../redux/action/projectCategoryAction";

export default function CreateProject(props) {
  const projectCategory = useSelector(
    (state) => state.projectCategoryReducer.projectCategory
  );
  console.log("projectCategory: ", projectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    getApiProjectCategory();
  }, []);

  const getApiProjectCategory = () => {
    const action = projectCategoryAction();
    dispatch(action);
  };

  const renderProjectCategory = () => {
    return projectCategory.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.projectCategoryName}
        </option>
      );
    });
  };

  const categoryFormik = useFormik({
    initialValues: {
      projectName: "",
      projectUrl: "",
      description: "",
      projectCategoryId: projectCategory[0]?.id,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Vui lòng nhập tên dự án"),
      projectUrl: Yup.string().required("Vui lòng nhập đường dẫn"),
    }),
    onSubmit: (values) => {
      console.log("values ceate project: ", values);
      let action = projectCategoryAction(values);
      dispatch(action);
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    touched,
    values,
    errors,
  } = categoryFormik;

  const handleEditorChange = (content) => {
    setFieldValue("description", content);
    // console.log("content: ", content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: "60%" }} className="mt-4">
        {/* Project name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="projectName"
            placeholder="Tên dự án"
            // required="required"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectName}
          />
          {touched.projectName && errors.projectName ? (
            <div
              className="d-flex text-danger"
              style={{ margin: "0px", color: "red" }}
            >
              {errors.projectName}
            </div>
          ) : null}
        </div>
        {/* URL */}
        <div className="mb-3">
          <label className="form-label">URL</label>
          <input
            className="form-control"
            name="projectUrl"
            placeholder="https://github.com/phanquang07/jira"
            // required="required"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectUrl}
          />
          {touched.projectUrl && errors.projectUrl ? (
            <div
              className="d-flex text-danger"
              style={{ margin: "0px", color: "red" }}
            >
              {errors.projectUrl}
            </div>
          ) : null}
          {/* Category */}
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="projectCategoryId"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectCategoryId}
          >
            {renderProjectCategory()}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <Editor
            name="description"
            initialValue="<p>Description</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
            value={values.description}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onSubmit={handleSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-3"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
