

function chatGptPost(){
    var ourMessageDiv = document.createElement('div');
    ourMessageDiv.innerHTML = document.getElementById('chatGptEntry').value;

    document.getElementById('chatGptDisplay').appendChild(ourMessageDiv);


    let httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            var jsonResponse = JSON.parse(httpRequest.responseText);
            console.log(jsonResponse);
            
            var childDiv = document.createElement('div');
            childDiv.innerHTML = jsonResponse.message;

            document.getElementById('chatGptDisplay').appendChild(childDiv);
          } else {
            console.log('Request failed with status: ' + httpRequest.status);
          }
        }
      };

      httpRequest.open("POST", "/api/chatGpt");

      // Set the request headers
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Define the parameters
        var params = 'message=' + document.getElementById('chatGptEntry').value; // Replace with your actual parameters

        // Send the request with the parameters
        httpRequest.send(params);

        document.getElementById('chatGptEntry').value = ''
}