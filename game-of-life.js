function game(dom, width, height) {

    var ctxt = dom.getContext("2d")
    ctxt.canvas.width = width
    ctxt.canvas.height = height

    var grid = fillRandom(createNewGrid(width, height))
    draw(grid, ctxt)
    run(grid, ctxt)

    function fillRandom(arr) {
        for (var i = 0; i < arr.length; i++) { 
            for (var j = 0; j < arr[i].length; j++) { 
                arr[i][j] = Math.round(Math.random())
            }
        }
        return arr
    }

    function createNewGrid(numCols, numRows) {
        var arr = new Array(numCols)
        for (var i = 0; i < numCols; i++) { 
          arr[i] = new Array(numRows)
        }
        return arr
    }

    function draw(arr, ctxt) {
        ctxt.clearRect(0, 0, ctxt.height, ctxt.width)

        for (var i = 0; i < arr.length; i++) { 
            for (var j = 0; j < arr[i].length; j++) { 
                if(arr[i][j] === 1) { 
                    // alive
                    ctxt.fillRect(i, j, 1, 1)
                }
            }
        }
    }
}

game(document.getElementById("canvas"), 400, 400)
