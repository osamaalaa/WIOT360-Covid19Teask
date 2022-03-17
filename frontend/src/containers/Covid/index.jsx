import React, { useState , useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Container, Row } from 'reactstrap';
import NewCases from './components/NewCases';
import ActiveCases from './components/ActiveCases';
import Recovered from './components/Recovered';
import Distance from './components/Distance';
import ActivityChart from './components/ActivityChart';
import ChartBig from './components/ChartBig';
import ReactTooltip from "react-tooltip";
import socketIOClient from "socket.io-client";   // Socket Client
const ENDPOINT = "http://localhost:9000";
// Covid
const CovidDashboard = () => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const [cases, setCases] = useState(0);
  const [RecoverCases, setRecoverCases] = useState(0);
  useEffect( () => {
    const socket = socketIOClient(ENDPOINT);
     socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.on("NewCases", data => {
     
      setCases(data);
    });
     socket.on("RecoverCases", data => {
     
      setRecoverCases(data);
    });
  }, []);
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Covid-19 Task</h3>
        </Col>
      </Row>
      <Row>
        <NewCases cases={cases} />
        <ActiveCases />
        <Recovered  recoverCases={RecoverCases} />
        <Distance />
      </Row>
      <Row>
        <ActivityChart setTooltipContent={setContent} response={response} />
        <ReactTooltip>{content}</ReactTooltip>
        <ChartBig cases={cases}  recoverCases={RecoverCases} />
      </Row>
    </Container>
  );
};


export default compose(connect(state => ({
  rtl: state.rtl,
})))(CovidDashboard);
