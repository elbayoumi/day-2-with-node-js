const fs = require('fs');
const http = require('http');
const open = require('open');

createPortNum = () => {
    return 4100
}
function createPort() {

    return `http://localhost:${createPortNum()}`
}
if (fs.existsSync("data.json")) {
    let html = JSON.parse(fs.readFileSync("data.json", 'utf-8'))



    let serve = http.createServer(function (req, res) {
        let uri = req.url.split('/');
        if (uri[1] == '') {
            res.write(`<h1>Wellcome</h1> <a href='home' >home </a>`)

        } else if (uri[1] == 'home') {
            let render = html.map((prop) => {
                return `<p><b>welcome to our APIs</b>   ${prop.name}`
            })
            res.write(`${render} </p> <a href="/" >back</a>     <a href="product" >product</a>`)
        } else if (uri[1] == 'product') {
            let readUri = html.find(element => { return element.id = (parseInt( uri[2]) || 1) });
            if (uri[2]) {
                let viewUri = `<!DOCTYPE html>
            <html>
            <head>
            <style>
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            
            td, th {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            
            tr:nth-child(even) {
              background-color: #dddddd;
            }
            </style>
            </head>
            <body>
            
            <h2>HTML Table</h2>
            
            <table>
              <tr>
                <td>the id : ${readUri.id}</td>
                <td>the name : ${readUri.name}</td>
                <td>the color : ${readUri.color}</td>
                <td>the price : ${readUri.price}</td>
              </tr>
            </table>
            <a href="/" >back</a>        <a href="/home" >home</a>
            </body>
            </html>
            
            `
                res.write(viewUri)
            }
            else {
                let render = html.map((prop) => {
                    return `<p> name => ${prop.name} color => ${prop.color} price => ${prop.price} </p> `
                })
                res.write(`${render} </p> <a href="/" >back</a>        <a href="home" >home</a>`)
            }


        }
        else {   
            
            res.writeHead(404)

            res.write("<h1>ERROR</h1>")
 
            
        }
        res.end();
    }).listen(createPortNum(), () => {
        console.log(createPort())
        setTimeout(() => open(createPort()), 2000)

    }
    );



} else {
    let data = `[
    {
        "id":1,
        "name": "p1",
        "color": "red",
        "price": 100
    },
    {
        "id":2,
        "name": "p2",
        "color": "blue",
        "price": 200
    },
    {
        "id":3,
        "name": "p3",
        "color": "black",
        "price": 300
    }
]`
    fs.writeFileSync("data.json", data);
    setTimeout(()=>{
        return process.exit();
    },5000)
}

