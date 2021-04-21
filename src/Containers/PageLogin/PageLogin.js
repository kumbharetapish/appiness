import { Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import AuthService from "../../Services/AuthService";
import { adminDashboardLink, userDashboardLink } from "../../Utils/Network";
import LoginFromStyle from "./LoginFrom.module.css";

export class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDate: { username: "", password: "" },
      userinfo: {},
      userName: "",
    };
    this.getFromResponse = this.getFromResponse.bind(this);
  }

  getFromResponse = (e) => {
    AuthService.loginAuth(e)
      .then((response) => {
        if (response.status === 200 && response.data && response.data.code === "DONE") {
          let tokan = `admin_DB_name_${e.username}`;
          this.setState({
            userinfo: { tokan, ...e },
          });
          localStorage.setItem("userinfo", JSON.stringify(this.state.userinfo));
          this.props.history.push(adminDashboardLink);
        }
      })
      .catch((err) => {
        this.setState({
          error: err.data,
        });
        console.log("error", this.state.error);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            this.getFromResponse(values);
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().email().required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password should be 8 chars minimum.")
            .matches(/(?=.*\d)(?=.*[a-z]).{8,}/, "Password must have lowercase letter and number."),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div className={LoginFromStyle.loginFromContainer}>
              <div className={LoginFromStyle.headingWrapper}>
                <h1> Welcome to Dashboard, Login</h1>
              </div>
              <div className={LoginFromStyle.fromWrapper}>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="Username">
                    Email
                    <input
                      name="username"
                      type="text"
                      placeholder="Enter your email"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.username && touched.username && "error"}
                    />
                    {errors.email && touched.email && (
                      <p className={LoginFromStyle.inputFeedback}>{errors.email}</p>
                    )}
                  </label>

                  <label htmlFor="password">
                    Password
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                      required
                    />
                    {errors.password && touched.password && (
                      <p className={LoginFromStyle.inputFeedback}>{errors.password} </p>
                    )}
                  </label>

                  <button
                    type="submit"
                    className={LoginFromStyle.button}
                    disabled={isSubmitting}
                    // path={Dashboard_Link}
                  >
                    Login
                  </button>
                  <p style={{ color: "red" }}>
                    {this.state.error && this.state.error.message ? this.state.error.message : ""}{" "}
                  </p>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default PageLogin;
