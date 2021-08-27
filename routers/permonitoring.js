const express = require('express');
const { reset } = require('nodemon');
const {model} = require('mongoose');
const { Router } = require('express');
const path = require('path');
const fs  =require('fs');
const router = express.Router()
module.exports = (database )=>{
    router.get('/',(req,res)=>{
        res.sendFile('performancemonitoring.js', { root:path.join(__dirname,"../views")});
    })   
    router.post('/', async (req,res)=>{
        const {logs,projectKey} = req.body
        var timeOrigin = logs.timeOrigin
        var connectStart = logs.timing.connectStart
        var navigationStart = logs.timing.navigationStart
        var domLoading = logs.timing.domLoading
        var secureConnectionStart = logs.timing.secureConnectionStart
        var fetchStart = logs.timing.fetchStart
        var domContentLoadedEventStart = logs.timing.domContentLoadedEventStart
        var responseStart = logs.timing.responseStart
        var responseEnd = logs.timing.responseEnd
        var domInteractive = logs.timing.domInteractive
        var domainLookupEnd = logs.timing.domainLookupEnd
        var redirectStart = logs.timing.redirectStart
        var requestStart = logs.timing.requestStart
        var requestEnd = logs.timing.requestEnd
        var unloadEventEnd = logs.timing.unloadEventEnd
        var unloadEventStart = logs.timing.unloadEventStart
        var domComplete = logs.timing.domComplete
        var domainLookupStart = logs.timing.domainLookupStart
        var loadEventStart = logs.timing.loadEventStart
        var domContentLoadedEventEnd = logs.timing.domContentLoadedEventEnd
        var redirectEnd = logs.timing.redirectEnd
        var connectEnd = logs.timing.connectEnd
        var apikey2= projectKey.userKey
        var navigation = logs.navigation
        var projectkey2 = projectKey.projectKey
        const response=responseEnd-responseStart;
        const connect =connectEnd-connectStart;
        const redirect=redirectEnd-redirectStart;
        const request=requestEnd-requestStart;


        let mainPerformance = await new database.models.performanceModel({
            response,
            connect,
            redirect,
            request,
            timeOrigin,
            connectEnd,
            connectStart,
            navigationStart,
            domLoading,
            secureConnectionStart,fetchStart,domContentLoadedEventEnd
            ,domContentLoadedEventEnd,
            responseStart,
            responseEnd,domContentLoadedEventStart,domInteractive,
            domainLookupEnd,
            redirectEnd,
            requestStart,
            requestEnd,
            redirectStart,
            unloadEventEnd,
            unloadEventStart,
            domComplete,
            domainLookupStart,
            date:Date.now(),
            domainLookupStart,
            loadEventStart,
            apikey2,
            navigation,
            projectkey2
            
        });
        await mainPerformance.save()
    });


    return router
}