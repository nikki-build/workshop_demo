var os = require('os');
  
// return the cpu architecture
console.log("CPU architecture: " + os.arch());
  
// It returns the amount of free system memory in bytes
console.log("Free memory: " + os.freemem());
  
// It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem());
  
// It returns the list of network interfaces
console.log('List of network Interfaces: ' + os.networkInterfaces());
  
// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : ' + os.tmpdir ());