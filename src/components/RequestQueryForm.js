import React from "react";
import book from "@/../public/assets/icons/request-quote.webp";
import { useTheme } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AddUserForm } from "../redux/features/form/formSlice";
import { useRouter } from "next/router";
function RequestQueryForm() {
  const router = useRouter();
  const queryEmail = typeof router.query?.email === "string" ? router.query.email : "";
  const { loading } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const theme = useTheme();

  const openWhatsApp = () => {
    const phoneNumber = "923001420033";
    const message = `ERS TECH: Delivering innovative, scalable, and secure software solutions tailored to your needs. Let's transform your ideas into reality!`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };
  return (
    <>
      <Box id="contact" className="scroll-mt-28">
        <Grid container className="!w-10/12 !mx-auto">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Box className="bg-white shadow-xl pb-6 xl:h-[450px] lg:h-[450px] md:h-full sm:h-full xsm:h-full xxs:h-full xxxs:h-full min-h-full">
                <Box className="p-2">
                  <Image
                    src={book}
                    className="lg:w-full md:w-1/2 lg:mx-0 md:mx-auto h-full object-cover mb-4"
                    alt="Consultation illustration"
                    loading="lazy"
                  />
                </Box>
                <Box className="block text-center px-4">
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !mb-8 !leading-[170%] tracking-[-0.16px]"
                  >
                    We’re here to help you bring your ideas to life! Whether
                    you’re looking for custom software development or technical
                    consulting, our team is just a message away.
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component={"p"}
                    gutterBottom
                    className="!text-[14px] !font-[400] font-poppins !leading-[170%] tracking-[-0.16px]"
                  >
                    Fill out the form with your details, and we’ll get back to
                    you as soon as possible. Your journey to innovative
                    solutions starts here!
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} className="relative">
              <Box className="request-form-bg"></Box>
              <Box className="request-form bg-white shadow-xl p-4">
                <Box className="relative h-[70px]">
                  <Box className="arrow-bg-img"></Box>
                </Box>
                <Grid
                  container
                  spacing={4}
                  className="xl:h-[520px] lg:h-[580px] md:h-full sm:h-full xsm:h-full xxs:h-full xxxs:h-full min-h-full px-4"
                >
                  <Grid item xs={12} sm={12} md={6} lg={7} sx={{ order: { xs: 2, md: 1 ,lg:1} }}>
                    <Box className="block text-start mb-6">
                      <Typography
                        variant="h6"
                        component="p"
                        className="!text-lg !font-[500] font-poppins !leading-[140%]"
                      >
                        Have a Question or
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        className="!text-xl !font-[600] !text-ersPrimary font-poppins !leading-[140%]"
                      >
                        Need a Quote?
                      </Typography>
                      <Divider className="w-[170px] !border-[1.5px]" />
                    </Box>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        email: queryEmail || "",
                        Name: "",
                        Contact: "",
                        Subject: "",
                        Message: "",
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
                        Subject: Yup.string().required("Subject is required"),
                        Message: Yup.string().required("Message is required"),
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
                          formData.append("subject", values.Subject);
                          formData.append("message", values.Message);
                          const result = await dispatch(AddUserForm(formData));
                          if (result.payload?.message === "success") {
                            setStatus({ success: true });
                            resetForm();
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
                        <form
                        className="lg:pb-0 md:pb-12 sm:pb-12 xsm:pb-12 xxs:pb-12 xxxs:pb-12"
                          autoComplete="off"
                          noValidate
                          onSubmit={handleSubmit}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
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
                                  inputProps={{ "aria-label": "Your Name", id: "contact-name" }}
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
                            <Grid item xs={12} sm={12} md={6}>
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
                                  inputProps={{ "aria-label": "Your Email", id: "contact-email" }}
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
                            <Grid item xs={12} sm={12} md={6}>
                              <FormControl
                                fullWidth
                                error={Boolean(
                                  touched.Contact && errors.Contact
                                )}
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
                                  inputProps={{ "aria-label": "Your Phone Number", id: "contact-phone" }}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                      /^\d*$/.test(value) &&
                                      value.length <= 15
                                    ) {
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
                            <Grid item xs={12} sm={12} md={6}>
                              <FormControl
                                fullWidth
                                error={Boolean(
                                  touched.Subject && errors.Subject
                                )}
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
                                  inputProps={{ "aria-label": "Subject", id: "contact-subject" }}
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
                            <Grid item xs={12} sm={12} md={12}>
                              <FormControl
                                fullWidth
                                error={Boolean(
                                  touched.Message && errors.Message
                                )}
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
                                  aria-label="Your Message"
                                  id="contact-message"
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
                              <Box sx={{ mt: 2, textAlign: "start" }}>
                                <Button
                                  disabled={loading}
                                  size="large"
                                  type="submit"
                                  className="xl:!w-[50%] lg:!w-[75%] md:!w-[50%] sm:!w-full xsm:!w-full xxs:!w-full xxxs:!w-full !rounded-[50px] !text-base !font-[500] font-poppins !leading-[140%] !tracking-[-0.16px] !text-white !capitalize send-msg-btn"
                                >
                                  Send Message
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={5} sx={{ order: { xs: 1, md: 2 ,lg:2}}}>
                    <Box className="grid place-content-center	text-start">
                      <Typography
                        variant="h6"
                        component="p"
                        className="!text-lg text-center !font-[500] font-poppins !leading-[140%]"
                      >
                        Talk To Our
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        className="!text-2xl !tracking-wide !font-[600] font-poppins !leading-[140%] !text-ersPrimary"
                      >
                        Sales Team!
                      </Typography>
                    </Box>
                    <Box className="grid place-content-center	text-center">
                      <Image
                        src={"/assets/images/sales-team.webp"}
                        width={180}
                        height={180}
                        className="object-cover"
                        alt="Khizar Mughal - Head of Sales"
                        loading="lazy"
                      />
                    </Box>
                    {/* <Box className="container-img-box">
                      <div className="container-inner">
                        <div className="circle"></div>
                        <Image
                          className="mask-img mask-img-one"
                          src={HR}
                          alt="Consultation illustration"
                        />
                      </div>
                    </Box> */}
                    <Box className="text-center mt-2">
                      <Typography
                        variant="h5"
                        component={"h5"}
                        className="!text-[26px] !font-[600] font-poppins !leading-[140%] text-black"
                      >
                        Khizar Mughal
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        gutterBottom
                        className="!text-base !font-[500] font-poppins !leading-[140%] text-ersPrimary"
                      >
                        Head of Sales
                      </Typography>
                    </Box>
                    <Box className="text-center">
                      <List className="flex items-center justify-center gap-8 !mb-2">
                        <Box className="!justify-center flex items-center !bg-inherit !rounded-[10px] !w-[30px] h-[30px]">
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/company/erstech/mycompany"
                          >
                            <FaLinkedin size={30} color="#1360D2" />
                          </Link>
                        </Box>
                        <Link
                          href="mailto:info@erstech.org"
                          className="!justify-center flex items-center !bg-inherit !rounded-[10px] !w-[30px] h-[30px]"
                        >
                          <Box className="bg-[#1360D2] rounded-[5px] p-[2px]">
                            <IoIosMail size={23} color="#fff" />
                          </Box>
                        </Link>

                        <Box className="!justify-center flex items-center !bg-inherit !rounded-[10px] !w-[30px] h-[30px]">
                          <button type="button" onClick={openWhatsApp}>
                            <FaSquarePhone size={30} color="#1360D2" />
                          </button>
                        </Box>
                      </List>
                      <Typography
                        variant="subtitle1"
                        component={"p"}
                        gutterBottom
                        className="!text-[14px] 
                        !font-[400] !text-center font-poppins !leading-[170%]"
                      >
                        With extensive experience in the software development
                        and fintech industries, Khizar Mughal is committed to
                        providing tailored solutions that meet your unique
                        needs.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default RequestQueryForm;
