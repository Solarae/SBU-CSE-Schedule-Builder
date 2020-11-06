import React, { Component } from 'react';
import { Spinner, Container, Row, Table, Button} from 'reactstrap';
import { connect } from 'react-redux';
import { getCourses } from '../actions/scheduleActions';
import PropTypes from 'prop-types';

class Schedule extends Component {
    componentDidMount() {
        this.props.getCourses();
    }

    renderTableHeader() {
        const header = ["Time","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        return header.map((hd) => {
            return hd === "Time" ? <th key={`Header ${hd}`}>{hd}</th>:
                                    <th key={`Header ${hd}`} 
                                    style={{backgroundColor: "#333333", color: "white"}}>{hd}</th>
        })
    }

    renderTD() {
        const rows = [];
        const times = [480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260];
        const timesString = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
                            "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
        const days = ["M", "TU", "W", "TH", "F"];
        const colorStyles = ["red", "blue", "green", "orange", "purple", "teal", "deeppink", "maroon", "deepskyblue", "gold"];
        const { courses } = this.props.course;
        console.log(courses);
        times.forEach(time => {
            const datas = [];
            const t = timesString.shift()
            datas.push(<td key={`Time: ${t}`} className="align-middle">{t}</td>);
            days.forEach(day => {
                const cellData = []; 
                courses.forEach((course, index) => {
                    const minStartTimeBound = Math.floor(course.minStartTime / 60) * 60;
                    const minEndTimeBound = Math.floor(course.minEndTime / 60) * 60;
                    if (course.days.includes(day) && (minStartTimeBound <= time && time <= minEndTimeBound)) {
                            cellData.length === 0 ? cellData.push(<span key={`${day}: ${t} ${index}`} style={{color: colorStyles[index], fontWeight: "bold"}}>
                                    {course.subject} {course.crs} {course.sctn} {course.cmp}
                                    <br/>{course.crsTitle}
                                    <br/>{course.startTime} - {course.endTime}<br/>{course.instructionMode}</span>)
                                    : cellData.push(<span key={`${day}: ${t} ${index}`} style={{color: colorStyles[index], fontWeight: "bold"}}>
                                    <hr/>{course.subject} {course.crs} {course.sctn} {course.cmp} 
                                    <br/>{course.startTime} - {course.endTime}<br/>{course.instructionMode}</span>)
                    }
                })
                datas.push(<td key={`${day}: ${t}`} style={{verticalAlign: "middle"}}>{cellData.map(d => d)}</td>);
            })
            rows.push(<tr key={`${t} Row`}>{datas}</tr>);
        })
        return rows;
    }

    render() {
        if (this.props.course.loading) {
            return <div className="d-flex justify-content-center">
                        <strong>Loading...</strong>
                        <Spinner color="danger"/>
                    </div>
        }

        return (
            <Container>
                <Row className="row justify-content-center">
                <h1>Schedule</h1>
                </Row>
                <Table bordered className="text-center">
                    <thead><tr>{this.renderTableHeader()}</tr></thead>
                    <tbody>{this.renderTD()}</tbody>
                </Table>
                <div className="text-center">
                    <Button onClick={() => this.props.history.goBack()}>
                        Back to Search
                    </Button>
                </div>
            </Container>
          );
    }
}

Schedule.propTypes = {
    getCourses: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    course : state.schedule
})

export default connect(mapStatesToProps, {getCourses}) (Schedule);
