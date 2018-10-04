// @flow
import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';

type Props = {};

export default class Test1 extends Component<Props> {
  render() {
    return (
      <Container>
        <Button>
          <Text>Hello</Text>
        </Button>
      </Container>
    );
  }
}
