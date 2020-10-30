const express = require('express')
const router = express.Router()

const Course = require('../../models/Course')

//@route    GET api/courses
//@desc     Get All Courses Based on Filter
router.get('/', (req, res) => {
    if (req.query.input === "") {
        Course.find()
        .then(courses => res.json(courses))
    } else if (req.query.field === "All Fields") {
        Course.find()
        .or([
            { subject: { "$regex": req.query.input, "$options": "i" } } ,
            { crs: { "$regex": req.query.input, "$options": "i" } },
            { cmp: { "$regex": req.query.input, "$options": "i" } },
            { sctn: { "$regex": req.query.input, "$options": "i" } },
            { days: { "$regex": req.query.input, "$options": "i" } },
            { startTime: { "$regex": req.query.input, "$options": "i" } },
            { endTime: { "$regex": req.query.input, "$options": "i" } },
            { mtgStartDate: { "$regex": req.query.input, "$options": "i" } },
            { mtgEndDate: { "$regex": req.query.input, "$options": "i" } },
            { duration: { "$regex": req.query.input, "$options": "i" } },
            { instructionMode: { "$regex": req.query.input, "$options": "i" } },
            { building: { "$regex": req.query.input, "$options": "i" } },
            { room: { "$regex": req.query.input, "$options": "i" } },
            { instr: { "$regex": req.query.input, "$options": "i" } },
            { enrlCap: { "$regex": req.query.input, "$options": "i" } },
            { waitCap: { "$regex": req.query.input, "$options": "i" } },
            { cmbndDescr: { "$regex": req.query.input, "$options": "i" } },
            { cmbndEnrlCap: { "$regex": req.query.input, "$options": "i" } },
            { crsTitle: { "$regex": req.query.input, "$options": "i" } },
        ])
        .then(courses => res.json(courses))
        .catch(() => res.status(404).json({success : false}))
    } else if (req.query.field === "Title/Class Name") {
        Course.find( { crsTitle: { "$regex": req.query.input, "$options": "i" } } )
            .then(courses => res.json(courses))
    } else if (req.query.field === "Class Number") {
        Course.find( { crs: { "$regex": req.query.input, "$options": "i" } } )
            .then(courses => res.json(courses))
    } else if (req.query.field === "Day") {
        Course.find( { days: { "$regex": req.query.input, "$options": "i" } } )
            .then(courses => res.json(courses))
    } else if (req.query.field === "Time") {
        Course.find( { startTime: { "$regex": req.query.input, "$options": "i" } } )
            .then(courses => res.json(courses))
    } else {
        return res.status(400).json({ msg: req.query.input});
    }
})

//@route    POST api/courses
//@desc     Create a course
router.post('/', (req, res) => {
    const newCourse = new Course({
        subject: req.body.subject, 
        crs: req.body.crs, 
        cmp: req.body.cmp, 
        sctn: req.body.sctn, 
        days: req.body.days, 
        startTime: req.body.startTime,
        minStartTime: req.body.minStartTime, 
        endTime: req.body.endTime,
        minEndTime: req.body.minEndTime, 
        mtgStartDate: req.body.mtgStartDate, 
        mtgEndDate: req.body.mtgEndDate, 
        duration: req.body.duration, 
        instructionMode: req.body.instructionMode, 
        building: req.body.building, 
        room: req.body.room, 
        instr: req.body.instr, 
        enrlCap: req.body.enrlCap, 
        waitCap: req.body.waitCap, 
        cmbndDescr: req.body.cmbndDescr, 
        cmbndEnrlCap: req.body.cmbndEnrlCap,
        crsTitle: req.body.crsTitle
    });
    newCourse.save().then(course => res.json(course));
});

//@route    Delete api/courses/id
//@desc     Delete a course
router.delete('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => course.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router