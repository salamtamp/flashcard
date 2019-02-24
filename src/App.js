import React, { Component } from 'react';
import './App.css';
import questionData from './questions';
import { Button, Row, Col, Input, Container, Alert } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: questionData,
      id: 0,
      question: '',
      answer: '',
      userAnswer: '',
      status: null,
    };

    this.onClickCheck = this.onClickCheck.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onClickReset = this.onClickReset.bind(this);

    this.createQuestion = this.createQuestion.bind(this);
    this.random = this.random.bind(this);
  }

  componentDidMount() {
    this.createQuestion();
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createQuestion() {
    const { list } = this.state;

    if (list.length > 0) {
      const randomNumber = this.random(1, list.length);
      this.setState({ ...list[randomNumber - 1] });
    } else {
      console.log('Not found lists');
    }
  }

  onClickCheck(answer, userAnswer) {
    if (answer === userAnswer) {
      this.setState({ status: true });
    } else if (answer !== userAnswer && userAnswer !== '') {
      this.setState({ status: false });
    } else {
      this.setState({ status: null });
    }
  }

  onChangeAnswer(text) {
    this.setState({ userAnswer: text });
  }

  onClickReset() {
    this.createQuestion();
    this.setState({ status: null, userAnswer: '' });
  }

  render() {
    const { question, answer, userAnswer, status } = this.state;
    let alertMessage = '';

    if (status === true) {
      alertMessage = <Alert color="success">That is correct!</Alert>;
    } else if (status === false) {
      alertMessage = (
        <Alert color="danger">
          `That is wrong! ({question} = {answer})`
        </Alert>
      );
    }

    return (
      <div className="App">
        <Container style={{ padding: '40px 20px', fontFamily: 'prompt' }}>
          <Row name="header" style={{ paddingBottom: 20 }}>
            <Col xs="12">
              <h2>แปลข้อความต่อไปนี้</h2>
            </Col>
          </Row>
          <Row name="keyword" style={{ color: '#17a2b8', paddingBottom: 10 }}>
            <Col xs="12">
              <h1>{question}</h1>
            </Col>
          </Row>
          <Row
            style={{
              paddingBottom: 10,
              borderRadius: 5,
              padding: '0px 5px 25px 5px',
            }}
          >
            <Col xs="12">
              <Input
                type="textarea"
                name="text"
                placeholder="พิมพ์คำแปลเป็นภาษาไทย"
                rows="10"
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  fontSize: 16,
                  padding: 10,
                }}
                value={userAnswer}
                onChange={e => this.onChangeAnswer(e.target.value)}
              />
            </Col>
          </Row>
          <Row
            style={{
              paddingBottom: 20,
            }}
          >
            <Col xs="12">
              <Button
                color="info"
                style={{ fontSize: 16 }}
                onClick={() => this.onClickCheck(answer, userAnswer)}
                disabled={userAnswer === ''}
              >
                ตรวจสอบ
              </Button>{' '}
              <Button
                color="default"
                style={{ fontSize: 16 }}
                onClick={this.onClickReset}
              >
                เริ่มต้นใหม่
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs="12">{alertMessage}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
