const childProcess = require("child_process")
const env = process.env

try {
  childProcess.spawn('java', ['--help'], { env: env })
  console.log('JRE is correctly configured in $PATH.')
  childProcess.spawn('node', ['--help'], { env: env })
  console.log('NodeJS is correctly configured in $PATH.')
} catch(e) {
  console.log('$PATH requires further configuration: ' + e.message)
}
