import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addCourse } from '../actions/scheduleActions'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CourseList extends Component {
    
    onAdd = (subject, crs, cmp, sctn, days, startTime, minStartTime, endTime, minEndTime, mtgStartDate, mtgEndDate, 
        duration, instructionMode, building, room, instr, enrlCap, waitCap, cmbndDescr, cmbndEnrlCap, crsTitle) => {
        const newCourse = {
            subject: subject, 
            crs: crs, 
            cmp: cmp, 
            sctn: sctn, 
            days: days, 
            startTime: startTime,
            minStartTime: minStartTime,  
            endTime: endTime,
            minEndTime: minEndTime, 
            mtgStartDate: mtgStartDate, 
            mtgEndDate: mtgEndDate, 
            duration: duration, 
            instructionMode: instructionMode, 
            building: building, 
            room: room, 
            instr: instr, 
            enrlCap: enrlCap, 
            waitCap: waitCap, 
            cmbndDescr: cmbndDescr, 
            cmbndEnrlCap: cmbndEnrlCap, 
            crsTitle: crsTitle
        }
        this.props.addCourse(newCourse);
    }

    render() {
        const courses = this.props.courseList;
        const startingIndex = this.props.startingIndex;
        return (
            <ListGroup>
                {courses.map(({_id, subject, crs, cmp, sctn, days, startTime, minStartTime, endTime,
                    minEndTime, mtgStartDate, mtgEndDate, duration, instructionMode, building,
                    room, instr, enrlCap, waitCap, cmbndDescr, cmbndEnrlCap, crsTitle}, index) => (
                        <ListGroupItem key={_id}>
                            <p>{startingIndex + index + 1}. <b>{`${subject} ${crs}-${cmp}-${sctn} ${crsTitle}`}</b>
                                </p>
                            <Row>
                                <Col xs="6" sm="4"><b>Instructor:</b> {instr}</Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="4"><b>Days & Times:</b> {`${days} ${startTime} - ${endTime}`} </Col>
                                <Col xs="6" sm="4"><b>Duration:</b> {`${duration}`}</Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="4"><b>Instruction Mode:</b> {instructionMode}</Col>
                                <Col xs="6" sm="4"><b>Location</b> {building}-{room}</Col>
                                <Col xs="6" sm="4">
                                    <Link to={`/schedule`}>
                                    <Button className="float-right" color="danger" 
                                        onClick={this.onAdd.bind(this, subject, crs, cmp, sctn, days, startTime, minStartTime, 
                                        endTime, minEndTime, mtgStartDate, mtgEndDate, duration, instructionMode, building,
                                        room, instr, enrlCap, waitCap, cmbndDescr, cmbndEnrlCap, crsTitle)}
                                    >Add</Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="4"><b>Meeting Dates:</b> {mtgStartDate}-{mtgEndDate}</Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="4"><b>Enrollment Capacity:</b> {enrlCap} </Col>
                                <Col xs="6" sm="4"><b>Waitlist Capacity:</b> {waitCap}</Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="4"><b>Combined Course Description:</b> {cmbndDescr} </Col>
                                <Col xs="6" sm="4"><b>Combined Course Enrollment Capacity:</b> {cmbndEnrlCap}</Col>
                            </Row>
                        </ListGroupItem>
                    ))}
            </ListGroup>
        );
    }
}

CourseList.propTypes = {
    addCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    course : state.course
})

export default connect(mapStatesToProps, {addCourse}) (CourseList);
