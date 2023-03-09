import * as yup from "yup";

export const editPostSchema = yup.object().shape({
  title: yup.string().required("Please Provide a Title"),
  body: yup.string().required("Please Provide a Body"),
});
