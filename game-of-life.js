function game(dom, width, height) {

    var ctxt = dom.getContext("2d")
    ctxt.canvas.width = width
    ctxt.canvas.height = height
    ctxt.fillStyle = "#FF0000"

    var grid = createNewGrid(width, height)
    var nextGrid = createNewGrid(width, height)
    var percentAlive = 0
    
    fillRandom()
    run()

    function fillRandom() {
        for (var i = 0; i < grid.length; i++) { 
            for (var j = 0; j < grid[i].length; j++) { 
                grid[i][j] = Math.round(Math.random())
            }
        }
    }

    function createNewGrid(numCols, numRows) {
        var arr = new Array(numCols)
        for (var i = 0; i < numCols; i++) { 
          arr[i] = new Array(numRows)
        }
        return arr
    }

    function draw() {
        ctxt.clearRect(0, 0, height, width)
        
        let numAlive = 0

        for (var i = 0; i < grid.length; i++) { 
            for (var j = 0; j < grid[i].length; j++) { 
                if(grid[i][j] === 1) { 
                    // alive
                    ctxt.fillRect(i, j, 1, 1)
                    numAlive++
                }

            }
        }
        percentAlive = (numAlive / (width * height)) * 100
        document.getElementById("percent").innerText = "Percent Alive: " + (Math.round(percentAlive * 100) / 100).toFixed(2) + "%"
    }

    function run() {
        draw()
        applyRules()
        requestAnimationFrame(run)
    }

    function applyRules() {
        for (var i = 0; i < grid.length; i++) { 
            for (var j = 0; j < grid[i].length; j++) { 
                let numAliveNeigh = numAliveNeighbors(i, j)
                
                if (grid[i][j] === 1) {
                    if (numAliveNeigh < 2) {
                        nextGrid[i][j] = 0
                    }
                    else if ((numAliveNeigh === 2) || (numAliveNeigh === 3)) { 
                        nextGrid[i][j] = 1
                    }
                    else if (numAliveNeigh > 3) { 
                        nextGrid[i][j] = 0
                    }
                }
                else { 
                    if (numAliveNeigh === 3) {
                        nextGrid[i][j] = 1
                    }
                    else { 
                        nextGrid[i][j] = 0
                    }
                }
            }
        }
        var temp = grid
        grid = nextGrid
        nextGrid = temp
    }

    function numAliveNeighbors(i, j) { 
        let alive = 0;

        // top
        if ((j - 1) >= 0)
            alive += grid[i][j - 1]
        
        // bottom
        if ((j + 1) < grid[i].length)
            alive += grid[i][j + 1]

        // left
        if ((i - 1) >= 0)
            alive += grid[i - 1][j]
        
        // right
        if ((i + 1) < grid.length)
            alive += grid[i + 1][j]

        // top left
        if (((i - 1) >= 0) && ((j - 1) >= 0))
            alive += grid[i - 1][j - 1]
        
        // top right
        if (((i + 1) < grid.length) && ((j - 1) >= 0))
            alive += grid[i + 1][j - 1]

        // bottom left
        if (((i - 1) >= 0) && ((j + 1) < grid[i].length))
            alive += grid[i - 1][j + 1]

        // bottom right
        if (((i + 1) < grid.length) && ((j + 1) < grid[i].length))
            alive += grid[i + 1][j + 1]

        return alive
    }
}

game(document.getElementById("canvas"), 400, 400)
