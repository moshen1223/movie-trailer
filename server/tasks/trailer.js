const cp = require('child_process');
const {resolve} = require('path');

(async ()=>{
    const script = resolve(__dirname, '../crawler/video.js');
    const child = cp.fork(script, []);
    let invoked = false;

    child.on('err', (err) => {
        if (invoked) return;
        invoked = true;
        console.log(err)
    })

    child.on('exit', (code) => {
        if (invoked) return;
        invoked = true;
        let err = code == 0 ? 'null' : new Error('err code' + code);
        console.log(err)
    })

    child.on('message', (data) => {
        let result = data;
        console.log(result)
    })
})()