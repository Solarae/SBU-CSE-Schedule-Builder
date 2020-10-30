const express = require('express')
const router = express.Router()

const Schedule = require('../../models/Schedule')

//@route    GET api/courses
//@desc     Get All Courses In Schedule
router.get('/', (req, res) => {
    Schedule.find().sort( { minStartTime : 1 } )
        .then(courses => res.json(courses))
})

//@route    POST api/courses
//@desc     Add a course to Schedule
router.post('/', (req, res) => {
    var reqString = req.body.days.toUpperCase();
    var pattern = "";
    if (reqString.includes("REC")) {
        reqString = reqString.replace("REC", "");
    }
    if (reqString.includes("TU") && reqString.includes("TH")) {
         pattern = `T[UH]`;
    } 
    pattern = `[${reqString}]`

    Schedule.findOne()
      .or([ { subject: req.body.subject, crs: req.body.crs, cmp: req.body.cmp, crsTitle: req.body.crsTitle },
                { $and: [ { days: { "$regex": pattern, "$options": "i" } }, 
                    { $or: [ {minStartTime: { $gte: req.body.minStartTime, $lte: req.body.minEndTime } }, 
                            { minEndTime: {$gte: req.body.minStartTime, $lte: req.body.minEndTime} } 
                           ] } 
                        ] }
      ]).then(course => {
          if (course) {
              return res.status(400).json({ msg: "There is a time overlap"});
          } 
          const newCourse = new Schedule({
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
});

//@route    Delete api/courses/id
//@desc     Delete a course from Schedule
router.delete('/:id', (req, res) => {
    Schedule.findById(req.params.id)
        .then(course => course.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router