import React, { Component } from "react";
import { connect } from "react-redux";
import { loginLink } from "../../Utils/Network";
import DashboardStyle from "./Dashboard.module.css";

export class PageAdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: localStorage.getItem("userinfo")
        ? JSON.parse(localStorage.getItem("userinfo"))
        : null,
      loginStatus: "false",
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    console.log("this.props.loginStatus", this.props.data.user);
    if (this.state.userinfo && this.state.userinfo.tokan) {
      this.setState({
        loginStatus: "true",
      });
    } else {
      this.setState(
        {
          loginStatus: "false",
        },
        () => {
          this.props.history.push(loginLink);
        }
      );
    }
  }

  render() {
    return (
      <div className={DashboardStyle.Container}>
        <div className={DashboardStyle.headingRow}>
          <div>
            <p>
              Welcome,{" "}
              <h2>
                {this.state.userinfo && this.state.userinfo.userName
                  ? this.state.userinfo.userName
                  : "Admin"}
              </h2>
            </p>
          </div>
          <div>
            <div
              className={DashboardStyle.logoutBtn}
              onClick={() => {
                localStorage.clear();
                this.props.history.push(loginLink);
              }}
            >
              Logout
            </div>
          </div>
        </div>

        <div className={DashboardStyle.rowThird}>
          <div className={DashboardStyle.tabel}>
            <div className={DashboardStyle.tabelTitle}>
              <div>{"Sr. No."}</div>
              <div>{"Name"}</div>
              <div>{"Email"}</div>
              <div>{"Age"}</div>
              <div>{"PhoneNo"}</div>
            </div>
            {this.props.data && this.props.data.user
              ? this.props.data.user.map((el, i) => {
                  return (
                    <div className={DashboardStyle.tabelBody}>
                      <div>{i + 1}</div>
                      <div>{el.name}</div>
                      <div>{el.email}</div>
                      <div>{el.age}</div>
                      <div>{el.phoneNo}</div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: state.data };
};

export default connect(mapStateToProps)(PageAdminDashboard);
