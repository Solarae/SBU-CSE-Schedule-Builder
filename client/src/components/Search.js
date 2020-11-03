import React, { Component } from 'react';
import { Spinner, Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import CourseList from './CourseList';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { getCourses } from '../actions/courseActions';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

class Search extends Component {
    // When page is directly loaded through refresh / URL Link
    state = {
        inputString: queryString.parse(this.props.location.search).input == null 
                                ? "" : queryString.parse(this.props.location.search).input ,
        field: queryString.parse(this.props.location.search).field == null 
                                ? "All Fields" : queryString.parse(this.props.location.search).field,
        currentPage: queryString.parse(this.props.location.search).page == null 
                                ? 1 : parseInt(queryString.parse(this.props.location.search).page),
        coursesPerPage: 10,
    }

    setCurrentPage = (pageNum) => pageNum !== this.state.currentPage &&
            this.props.history.push(`/?input=${this.state.inputString}&field=${this.state.field}&page=${pageNum}`);

    
    // Handles Browser Back/Forward Button
    componentDidUpdate(prevProps) {
        const params = queryString.parse(this.props.location.search)
        const prevParams = queryString.parse(prevProps.location.search)
        if (params.input !== prevParams.input || params.field !== prevParams.field || params.page !== prevParams.page) {
            this.props.history.go(0);
        }
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        this.props.getCourses(params.input == null ? '' : params.input, 
                              params.field == null ? 'All Fields' : params.field);
    }
    

    handleSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/?input=${this.state.inputString}&field=${this.state.field}`);
    }

    render() {
        if (this.props.course.loading) {
            return <div className="d-flex justify-content-center">
                        <strong>Loading...</strong>
                        <Spinner color="danger"/>
                    </div>
        }
        const { courses } = this.props.course;
        const indexOfLastCourse = this.state.currentPage * this.state.coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - this.state.coursesPerPage;
        const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
        
        return (
            <Container>
                <Row className="row justify-content-center">
                    <h1>CSE Class Find</h1>
                </Row>
                <Form onSubmit = {this.handleSearch}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Input type="text" value = {this.state.inputString} 
                                    onChange={(e) => this.setState({ inputString: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Input value = {this.state.field}
                                    onChange={(e) => this.setState({ field: e.target.value })} 
                                    type="select" name="select">
                                    <option value="All Fields">All Fields</option>
                                    <option value="Title/Class Name">Title/Class Name</option>
                                    <option value="Class Number">Class Number</option>
                                    <option value="Day">Day</option>
                                    <option value="Time">Time</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col><Button>Find</Button></Col>     
                    </Row>
                </Form>
                <div style={{textAlign: "center"}}>
                <Link to={`/schedule`}><Button color="primary">Generate Schedule</Button></Link>
                </div>
                <Row>
                    {courses.length !== 0 && <Col><h5>Search Results of {indexOfFirstCourse + 1} - {currentCourses.length + indexOfFirstCourse} of {courses.length}</h5></Col>}
                </Row>
                {courses.length === 0 ? <Row><Col><span className="bg-danger">{`Your search - ${queryString.parse(this.props.location.search).input} 
                                        - did not match any resources`}</span></Col></Row> :
                                        <CourseList courseList = {currentCourses} startingIndex = {indexOfFirstCourse}/>}
                <Pagination coursesPerPage = {this.state.coursesPerPage} totalPosts = {courses.length}
                                        setCurrentPage = {this.setCurrentPage}/>
            </Container>
          );
    }
}

Search.propTypes = {
    getCourses: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    course : state.course
})

export default connect(mapStatesToProps, {getCourses}) (Search);
