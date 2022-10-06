import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import {
  getUsers,
  createUsers,
  emailVerify,
  userVerify
} from "../actions/users";
// import "../register.css";

export class register extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    };
    this.onVerify = this.onVerify.bind(this);
    this.userVerify = this.userVerify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }


  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["fname"] = "";
      fields["lname"]="";
      fields["email"] = "";
      fields["password"] = "";
      let user = {
        fname: this.state.fields.fname,
        lname: this.state.fields.lname,
        email: this.state.fields.email,
        password: this.state.fields.password
      };
      this.props.createUsers(user);
      alert("Form submitted");
    }
  }

  onVerify() {
    let user = {
      email: this.state.fields.email
    };
    this.props.emailVerify(user);
    this.setState({
      show_otp_field: true
    });
  }

  userVerify() {
    let user = {
      otp: this.state.fields.otp
    };
    if (this.props.userVerify(user)) {
      this.submituserRegistrationForm();
      this.setState({
        fname: "",
        lname: "",
        email: "",
        password: ""
      });
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["fname"]) {
      formIsValid = false;
      errors["fname"] = "*Please enter your First name.";
    }

    if (typeof fields["fname"] !== "undefined") {
      if (!fields["fname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["fname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["lname"]) {
      formIsValid = false;
      errors["lname"] = "*Please enter your Last name.";
    }

    if (typeof fields["lname"] !== "undefined") {
      if (!fields["lname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }


    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    // if (fields["password"] != fields["confirm"]) {
    //   formIsValid = false;
    //   errors["confirm"] = "*Password don't match.";
    // }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    // console.log(this.props.users);
    return (
      <div>
        <Navbar />
        <div
          className="container"
          align="center"
          style={{
            width: 20 + "em",
            marginTop: 3 + "em",
            height: "auto",
            marginBottom: 3 + "em"
          }}
        >
          <div className="card" align="center">
            <form>
              <h1>Create Account</h1>

              <p>
                {/* <br /> */}
                <input
                  type="text"
                  name="fname"
                  placeholder=" Enter First Name "
                  value={this.state.fields.fname}
                  onChange={this.handleChange}
                />
              </p>
              <p>
                {/* <br /> */}
                <input
                  type="text"
                  name="lname"
                  placeholder=" Enter Last Name "
                  value={this.state.fields.lname}
                  onChange={this.handleChange}
                />
              </p>
              <p>
                <div className="errorMsg">{this.state.errors.name}</div>
                <input
                  type="text"
                  name="email"
                  placeholder=" Enter Email-Id"
                  value={this.state.fields.email}
                  onChange={this.handleChange}
                />
              </p>
              <p>
                <div className="errorMsg">{this.state.errors.phone}</div>
                <input
                  type="text"
                  name="password"
                  placeholder=" Enter Password"
                  value={this.state.fields.password}
                  onChange={this.handleChange}
                />
              </p>
              <p>
                <div className="errorMsg">{this.state.errors.password}</div>
                <input
                  type="text"
                  name="confirmpassword"
                  placeholder=" Re-Enter Password"
                  value={this.state.fields.confirmpassword}
                  onChange={this.handleChange}
                />
              </p>
              <p>
                <div className="errorMsg">{this.state.errors.confirm}</div>
              </p>
                <button
                  // style={{ width: 1 + "em" }}
                  className="otp"
                  style={{ marginTop: 2 + "em" }}
                  onChange={this.handleChange}
                  onClick={this.onVerify}
                >
                  Register
                </button>
              <p>
                {" "}
                ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userreducer.users
});

export default connect(
  mapStateToProps,
  { getUsers, createUsers, emailVerify, userVerify }
)(register);
