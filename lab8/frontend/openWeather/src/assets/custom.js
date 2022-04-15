function paulFunc() {
    var action_src = $("#number").val();
    // var your_form = $('numberForm').val();

    var urlLink = "http://localhost:3000/db/";
    urlLink = urlLink + action_src;

    // your_form.action = urlLink;
    alert(urlLink);
    window.location.href = urlLink;
    // fetch(urlLink).then(r=>r.json()).then(r=>console.log(r,"received"));
}

function putFunc(isBulk) {
    const requestOptions = {
        method: 'PUT',
        // body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    var action_src = $("#put_index").val();

    if(!isBulk){
        var urlLink = "http://localhost:3000/db/";
        urlLink = urlLink + action_src;
    }else{
        var urlLink = "http://localhost:3000/db/";
    }

    fetch(urlLink, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

function deleteFunc(isBulk) {
    const requestOptions = {
        method: 'DELETE',
    };
    var action_src = $("#delete_index").val();

    if(!isBulk){
        var urlLink = "http://localhost:3000/db/";
        urlLink = urlLink + action_src;
    }else{
        var urlLink = "http://localhost:3000/db/";
    }

    fetch(urlLink, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}