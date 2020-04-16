import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import admin from '../../images/admin.jpeg';
import { adminSignup } from '../../services/admin';

export default class AdminSignup extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      password: '',
      email: '',
      errors: {
        name: null,
        password: null,
        email: null,
      },
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const form = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    adminSignup(form)
      .then((res) => {
        this.props.history.push('/admin/login');
      })
      .catch((error) => {
        if (error.data) {
          this.setState({
            errors: error.data,
          });
        }
      });
  }

  render() {
    return (
      <Card
        border="info"
        style={{
          backgroundImage: `url(${admin})`,
          opacity: 0.8,
          color: 'black',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <br />
        <h2>Admin SignUp</h2>

        <Form onSubmit={this.onSubmit}>
          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} md="4" controlId="validationAdminName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={this.state.name}
                onChange={this.onChangeName}
                isInvalid={this.state.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          {/*      <Form.Row className="justify-content-md-center">
        <Form.Group as={Col} md="4" controlId="validationAdminReg">
          <Form.Label>Hospital Registration Number</Form.Label>
          <Form.Control
            required
            type="text"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Form.Row>*/}

          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} md="4" controlId="validationAdminEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                isInvalid={this.state.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} md="4" controlId="validationAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                isInvalid={this.state.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button type="submit">Admin SignUp</Button>
          <br />
        </Form>
        <br />
      </Card>
    );
  }
}
