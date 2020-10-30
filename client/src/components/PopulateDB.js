import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { addCourse } from '../actions/courseActions';
import PropTypes from 'prop-types';
import crsList from '../allCourses'

class PopulateDB extends Component {
    state = {
        courses: crsList
    }
    addCourses() {
        this.state.courses.forEach((course) => {
            const newCourse = {
                subject: course.subject, 
                crs: course.crs, 
                cmp: course.cmp, 
                sctn: course.sctn, 
                days: course.days, 
                startTime: course.startTime,
                minStartTime: course.minStartTime,  
                endTime: course.endTime,
                minEndTime: course.minEndTime, 
                mtgStartDate: course.mtgStartDate, 
                mtgEndDate: course.mtgEndDate, 
                duration: course.duration, 
                instructionMode: course.instructionMode, 
                building: course.building, 
                room: course.room, 
                instr: course.instr, 
                enrlCap: course.enrlCap, 
                waitCap: course.waitCap, 
                cmbndDescr: course.cmbndDescr, 
                cmbndEnrlCap: course.cmbndEnrlCap, 
                crsTitle: course.crsTitle
            }
            this.props.addCourse(newCourse);
        })
    }
    render() {
        return (
            <Button onClick={this.addCourses.bind(this)}>Populate DB</Button>
          );
    }
}

PopulateDB.propTypes = {
    addCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    course : state.course
})

export default connect(mapStatesToProps,{addCourse}) (PopulateDB);
