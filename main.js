fetch('jobs.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');

    if (indexOfSpace === -1) {
        return '';
    }

    return str.substring(indexOfSpace + 1);
}

function appendData(data) {
    var mainHeader = document.getElementById("myHeader");
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var h4 = document.createElement("h4");
        var div = document.createElement("div");

        //Split url's: variation in url's needs different split treatment for title generation
        if (data[i].url.includes("youngcapital")) {
            var pathname = new URL(data[i].url).pathname; //step 1
            var newPath = pathname.split('/'); //step 2 etc..
            var newPath2 = newPath[newPath.length - 1];
            var newPath3 = newPath2.replaceAll("-", " ");
            var newPath4 = removeFirstWord(newPath3);
            var updated_url = capitalizeFirstLetter(newPath4);

        } else if (data[i].url.includes("randstad")) {
            var pathname = new URL(data[i].url).pathname; //step 1
            var newPath = pathname.split('/'); //step 2 etc..
            var newPath2 = newPath[newPath.length - 1];
            var newPath3 = newPath2.replaceAll("-", " ");
            var updated_url = capitalizeFirstLetter(newPath3);

        } else if (data[i].url.includes("werkzoeken")) {
            var pathname = new URL(data[i].url).pathname;
            var newPath = pathname.split('/');
            var newPath2 = newPath[newPath.length - 2];
            var newPath3 = newPath2.replaceAll("-", " ");
            var newPath4 = removeFirstWord(newPath3);
            var updated_url = capitalizeFirstLetter(newPath4);
        };

        //assign url parts to different elements or containers
        h4.innerHTML = updated_url;
        var clickLink = '<a href="' + data[i].url + '" target="_blank">' + 'Ga naar vacature' + '</a>'; //create a link to vacancy
        div.innerHTML = clickLink;
        mainContainer.appendChild(h4);
        mainContainer.appendChild(div)
    }
}