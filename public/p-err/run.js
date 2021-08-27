const error = {};
const EAMONITORING2 = {
    onError: function(event) {
        if (event instanceof ErrorEvent) {
            error.error = {
                colno: event.colno,
                filename: event.filename,
                lineno: event.lineno,
                message: event.message,
            } 
        } else {
            error.error = {
                tagName: event.target.tagName,
                currentSrc: event.target.currentSrc
            }
        }
        error.navigator = {
            cookieEnabled: window.navigator.cookieEnabled,
            deviceMemory: window.navigator.deviceMemory,
            hardwareConcurrency: window.navigator.hardwareConcurrency,
            language: window.navigator.language,
            languages: window.navigator.languages,
            onLine: window.navigator.onLine,
            userAgent: window.navigator.userAgent,
            vendor: window.navigator.vendor,
            platform: window.navigator.platform,
            plugins: window.navigator.plugins,
            oscpu: window.navigator.oscpu,
            appName: window.navigator.appName,
            appVersion: window.navigator.appVersion,
            appCodeName: window.navigator.appCodeName
        }
        EAMONITORING2.post('/error', {error});
    },
    start:function(projectKey,userKey){
            localStorage.setItem('error',error)
            error['projectKey'] = projectKey
            error['userKey'] = userKey
            window.addEventListener('error', EAMONITORING2.onError, {capture: true});

    },
    post: function (url, logs,) {
        url = 'https://p-errmon.herokuapp.com/error'
        const http = new XMLHttpRequest();
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                console.log('sent');
            }
        }
        http.send(JSON.stringify(logs));
    }
}
const EAMONITORING = {
    onPerformance: function (projectKey,userKey) {
      const logs = window.performance && window.performance.toJSON();
      EAMONITORING.post("/performance", {logs},projectKey,userKey);
    },
    start:function(projectKey,userKey){
    
    window.addEventListener("load", EAMONITORING.onPerformance(projectKey,userKey), { capture: true });
    console.log('sent your data!')
    console.log(userKey)
    console.log(projectKey)
    
    },
    post: function (url, logs,projectKey,userKey) {
      logs.projectKey = projectKey
      logs.userKey = userKey
      url = 'https://p-errmon.herokuapp.com/performance'
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  
      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          console.log("sent");
        }
      };
      http.send(JSON.stringify(logs));
    },
  };

function PerrMonRun (key1,key2){
    EAMONITORING.start({ projectKey: key1, userKey:key2 });
    EAMONITORING2.start(key1,key2);
}