const createPortNum = () => {
    return 4010
}
function createPort() {

    return `http://localhost:${createPortNum()}`
}
module.exports= {

    createPortNum  ,
      createPort
}