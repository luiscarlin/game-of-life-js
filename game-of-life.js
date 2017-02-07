function game(dom) {

    var ctx = dom.getContext("2d"), 
        cells = [];

    init();
    run();

    function init() { 
        console.log("initialize the grid");
        draw();
    }

    function run() { 
        console.log("New Generation");
        draw();

        setTimeout(function() { run(); }, 3000);
    }

    function draw() { 
        console.log("drawing grid")
    }
}

game(document.getElementById("canvas"));
