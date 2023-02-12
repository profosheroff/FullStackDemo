
function testButton (){
    var name = document.getElementById('new_text_input').value;
    var newtext = "Hello " + name
    console.log(newtext)
    
    document.getElementById("new_result").innerHTML = newtext;
  
}

function queryWebserver() {
    name = ""
    fetch("//localhost:2020/" + name)
    .then((response) =>{
       if (!response.ok) {  
            throw new Error('HTTP error: ${response.status}');
        }
        return response.text()
    })
    .then((text) => {
        console.log(text)
        document.getElementById("web_server_result").innerHTML = text
    })
    .catch((error) => console.log('trouble'));

}
function databaseWrite() {
    console.log("writing to database")
    var company_name = document.getElementById('company_name').value;
    var company_address = document.getElementById('company_address').value;
    search_string = "?name="+company_name+"&address="+company_address
    fetch("//localhost:2020/update"+ search_string)
    .then((response) =>{
       console.log("response = " + response)
       if (!response.ok) {  
            throw new Error('HTTP error: ${response.status}');
        }
        return response.text()
    })
    .then((text) => {
        console.log("text = " + text)
        document.getElementById("database_server_write_result").innerHTML = text
    })
    .catch((error) => console.log('trouble - ' + error));

}
function databaseRead() {
    console.log("reading from database")
    var record_id = document.getElementById('record_id').value;
    search_string = "?recordID="+record_id
    fetch("//localhost:2020/read"+ search_string)
    .then((response) =>{
       console.log("response = " + response)
       if (!response.ok) {  
            throw new Error('HTTP error: ${response.status}');
        }
        return response.text()
    })
    .then((text) => {
        console.log("text = " + text)
        document.getElementById("database_server_read_result").innerHTML = text
    })
    .catch((error) => console.log('trouble - ' + error));

}