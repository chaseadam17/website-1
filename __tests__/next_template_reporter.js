class NextTemplateReporter {
  report(data) {
    console.log("NEXTTEMPLATEREPORTSTART" + JSON.stringify(data) + "NEXTTEMPLATEREPORTEND")
  }

  async onTestCaseResult(test, testResult, _results) {
    // console.dir(testResult, { depth: null })
    this.report({ 
      testResult: {
        path: test.path,
        status: testResult.status,
        fullName: testResult.fullName,
        failureDetails: testResult.failureDetails.map((details) => details.matcherResult),
        failureMessage: testResult.failureMessage
      }
    })
  }

  async onRunStart(run, estimates) {
    this.report({
      runStart: {
        startTime: run.startTime
      }
    })
  }

  async onTestStart(test) {
    this.report({ 
      testStart: {
        path: test.path
      }
    })
  }

  // async onTestResult(test, testResult, _results) {
  //   if (testResult.failureMessage) {
  //     this.report({ 
  //       testResult: {
  //         path: test.path,
  //         failureMessage: testResult.failureMessage
  //       }
  //     })
  //   }
  //   // this.report({ 
  //   //   testResult: {
  //   //     path: test.path,
  //   //     status: testResult.testResults[0]?.status,
  //   //     message: testResult.testResults[0]?.fullName,
  //   //     failureMessage: testResult.failureMessage
  //   //   }
  //   // })
  // }

  // async onRunComplete(contexts, results) {
  //   console.log("")
  //   console.log("")
  //   console.log("")
  //   console.log("")
  //   console.log("RUN COMPLETE", contexts, results)
  // }
}

module.exports = NextTemplateReporter;