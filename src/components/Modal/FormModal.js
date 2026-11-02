import React from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/material/styles";
import MuiModal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AddUserForm } from "../../redux/features/form/formSlice";
import SpinnerLoader from "@/utils/SpinnerLoader";
function FormModal({ open, onClose, data }) {
  const { loading } = useSelector((state) => state.form);
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => onClose(false)}
          closeAfterTransition
        >
          <Fade in={open}>
            <ModalContent sx={style} className="lg:w-[500px] md:w-[500px] sm:[400px] xsm:w-[350px] xxs:w-[330px] xxxs:w-[300px] lg:overflow-hidden md:overflow-hidden sm:overflow-scroll xsm:overflow-scroll xxs:overflow-scroll xxxs:overflow-scroll md:h-[unset] sm:h-[100vh] xsm:h-[100vh] xxs:h-[100vh] xxxs:h-[100vh]">
              <Box className="text-center">
                <h2
                  id="transition-modal-title"
                  className="modal-title text-2xl font-[600] text-center font-poppins"
                >
                  Job Application
                </h2>
                <p className="text-sm font-[400] font-poppins">
                  Please fill the form
                </p>
              </Box>
              <Formik
                enableReinitialize
                initialValues={{
                  email: "",
                  Name: "",
                  Contact: "",
                  Message: "",
                  Subject: data === "other" ? "" : (data?.title || ""),
                  file: null,
                }}
                validationSchema={Yup.object().shape({
                  Name: Yup.string()
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .required("Name is required"),
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Email is Required"),
                  Contact: Yup.string()
                    .min(5, "Too Short!")
                    .max(15, "Too Long!")
                    .required("Phone Number is required"),
                  Message: Yup.string().required("Message is required"),
                  Subject: data === "other"
                    ? Yup.string().required("Subject is required")
                    : Yup.string(),
                  file: Yup.mixed()
                    .nullable()
                    .test("fileType", "Only PDF files are allowed", (value) => {
                      return (
                        value === null ||
                        (value && value.type === "application/pdf")
                      );
                    })
                    .required("Resume is required"),
                })}
                onSubmit={async (
                  values,
                  { setSubmitting, setErrors, setStatus, resetForm }
                ) => {
                  try {
                    setStatus({ success: true });
                    setSubmitting(false);
                    const formData = new FormData();
                    formData.append("name", values.Name);
                    formData.append("email", values.email);
                    formData.append("contact", values.Contact);
                    formData.append(
                      "subject",
                      data === "other" ? values.Subject : (data?.title || values.Subject || "Job Application")
                    );
                    formData.append("message", values.Message);
                    if (values.file) {
                      formData.append("resume", values.file);
                    }
                    const result = await dispatch(AddUserForm(formData));
                    if (result.payload?.message === "success") {
                      setStatus({ success: true });
                      resetForm();
                      onClose(!open);
                    }
                  } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.Name && errors.Name)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Name"
                            margin="normal"
                            name="Name"
                            type="text"
                            value={values.Name}
                            variant="standard"
                            autoComplete="new-password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.Name && errors.Name && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors.Name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Email"
                            margin="normal"
                            name="email"
                            type="email"
                            value={values.email}
                            variant="standard"
                            autoComplete="new-password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.email && errors.email && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors.email}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={data === "other" ? 6 : 12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.Contact && errors.Contact)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Phone Number"
                            margin="normal"
                            name="Contact"
                            type="number"
                            value={values.Contact}
                            variant="standard"
                            autoComplete="new-password"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value) && value.length <= 15) {
                                setFieldValue("Contact", value);
                              }
                            }}
                            maxLength="15"
                          />
                          {touched.Contact && errors.Contact && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors.Contact}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {data === "other" && (
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.Subject && errors.Subject)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <TextField
                              fullWidth
                              placeholder="Subject"
                              margin="normal"
                              name="Subject"
                              type="text"
                              value={values.Subject}
                              variant="standard"
                              autoComplete="new-password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {touched.Subject && errors.Subject && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text--register"
                              >
                                {errors.Subject}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.Message && errors.Message)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <TextareaAutosize
                            onBlur={handleBlur}
                            onChange={handleChange}
                            margin="normal"
                            value={values.Message}
                            name="Message"
                            maxRows={3}
                            minRows={3}
                            className="resize-none w-full text-base font-normal leading-normal border-b border-solid border-slate-300 hover:border-gray-500  focus:border-black-500 bg-white focus-visible:outline-0"
                            aria-label="empty textarea"
                            placeholder="Message"
                          />
                          {touched.Message && errors.Message && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text--register"
                            >
                              {errors.Message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Typography
                          component={"p"}
                          variant="p"
                          className="text-sm font-[400] mb-2 !leading-[90%]"
                        >
                          Resume*
                          <br />
                          <span className="text-[10px]">(PDF Only)</span>
                        </Typography>
                        <Box
                          sx={{
                            border: "2px dashed #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            "&:hover": { backgroundColor: "#f1f1f1" },
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type === "application/pdf") {
                              setFieldValue("file", file);
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file && file.type === "application/pdf") {
                                setFieldValue("file", file);
                              }
                            }}
                            accept="application/pdf"
                          />
                          <label htmlFor="file">
                            <div className="flex justify-center items-center">
                              <AiOutlineCloudUpload size="30" color="#1976d2" />
                            </div>
                            <Box className="flex justify-center items-center gap-2 mt-4">
                              <Typography variant="body1">
                                Drag & Drop or
                              </Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Upload file
                              </Button>
                            </Box>
                          </label>
                          {values.file && (
                            <Typography variant="body2" sx={{ marginTop: 2 }}>
                              {values.file.name}
                            </Typography>
                          )}
                        </Box>
                        {touched.file && errors.file && (
                          <Typography color="error" sx={{ marginTop: 1 }}>
                            {errors.file}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Box sx={{ mt: 4, textAlign: "end" }}>
                          <Button
                            disabled={loading}
                            size="large"
                            type="submit"
                            className="py-2 xl:!w-[30%] lg:!w-[30%] md:!w-[30%] sm:!w-full xsm:!w-full xxs:!w-full xxxs:!w-full !rounded-[50px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !text-white !capitalize send-msg-btn"
                          >
                            {loading ? <SpinnerLoader /> : "submit"}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </ModalContent>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(MuiModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
Backdrop.displayName = "Backdrop";
FormModal.displayName = "FormModal";
export default FormModal;
