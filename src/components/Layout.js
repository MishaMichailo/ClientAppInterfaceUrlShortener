import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Container } from 'reactstrap';

export class Layout extends Component {
  
  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
