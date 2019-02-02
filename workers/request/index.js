const utils = require('./utils')

//console.log('hello worker')
// 在 Worker 线程执行上下文会全局暴露一个 worker 对象，直接调用 worker.onMeesage/postMessage 即可
//console.log("333333333333333333")
worker.postMessage({
  msg: 'hello from worker: ' + utils.test(),
  buffer: utils.str2ab('hello arrayBuffer from worker')
})
//console.log("44444444444444444444")
worker.onMessage((msg) => {
 // console.log('[Worker] on appservice message', msg)
 // const buffer = msg.buffer
 // console.log('[Worker] on appservice buffer length ', buffer)
 // console.log('[Worker] on appservice buffer', utils.ab2str(buffer))
})