const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    subject: {
        type: String,
        required: true
    }, 
    crs: {
        type: String,
        required: true
    }, 
    cmp: {
        type: String,
        required: true
    }, 
    sctn: { 
        type: String,
        required: true
    }, 
    days: {
        type: String,
        required: true
    }, 
    startTime: {
        type: String,
        required: true
    },
    minStartTime: {
        type: Number,
        required: true
    },  
    endTime: {
        type: String,
        required: true
    },
    minEndTime: {
        type: Number,
        required: true
    }, 
    mtgStartDate: {
        type: String,
        required: true
    }, 
    mtgEndDate: {
        type: String,
        required: true
    }, 
    duration: {
        type: String,
        required: true
    }, 
    instructionMode: {
        type: String,
        required: true
    }, 
    building: {
        type: String,
        required: true
    }, 
    room: {
        type: String,
        required: true
    }, 
    instr: {
        type: String,
        required: true
    }, 
    enrlCap: {
        type: String,
        required: true
    }, 
    waitCap: {
        type: String,
        required: true
    }, 
    cmbndDescr: {
        type: String,
        default: ""
    }, 
    cmbndEnrlCap: {
        type: String,
        default: ""
    },
    crsTitle: {
        type: String,
        required: true
    }
})

CourseSchema.index( { days: "text"} );
module.exports = Schedule = mongoose.model('schedule', CourseSchema)