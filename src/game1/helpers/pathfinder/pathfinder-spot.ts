const LURDMoves = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1]
]
// const DiagonalMoves = [
//   [-1, -1],
//   [1, -1],
//   [1, 1],
//   [-1, 1]
// ]
// const DiagonalBlockers = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 0]
// ]

export class Spot {
  grid: Spot[][] = []

  x: number = 0
  y: number = 0

  f: number = 0
  g: number = 0
  h: number = 0
  vh: number = 0

  neighbors: Spot[] = []
  neighboringWalls: Spot[] = []

  previous: Spot | undefined = undefined

  wall: boolean = false

  visited: boolean = false

  constructor(i: number, j: number, isWall: boolean, grid: Spot[][]) {
    this.x = i
    this.y = j

    this.grid = grid

    this.wall = isWall
  }

  getNeighbors() {
    if (this.neighbors.length === 0) {
      this.populateNeighbors()
    }
    return this.neighbors
  }

  getNeighboringWalls() {
    if (this.neighboringWalls.length === 0) {
      this.populateNeighbors()
    }

    return this.neighboringWalls
  }

  getNode(i: number, j: number) {
    if (i < 0 || i >= this.grid.length || j < 0 || j >= this.grid[0].length) {
      return null
    }
    return this.grid[i][j]
  }

  populateNeighbors() {
    this.neighbors = []
    this.neighboringWalls = []

    for (let i = 0; i < 4; i++) {
      const node = this.getNode(this.x + LURDMoves[i][0], this.y + LURDMoves[i][1])
      if (node != null) {
        if (!node.wall) {
          this.neighbors.push(node)
        } else {
          this.neighboringWalls.push(node)
        }
      }
    }

    //Add Diagonals

    // for (var i = 0; i < 4; i++) {
    //     var gridX = this.x + DiagonalMoves[i][0];
    //     var gridY = this.y + DiagonalMoves[i][1];

    //     var node = this.getNode(gridX, gridY);

    //     if (node != null) {
    //         if (allowDiagonals && !node.wall) {
    //             if (!canPassThroughCorners) {
    //                 //Check if blocked by surrounding walls
    //                 var border1 = DiagonalBlockers[i][0];
    //                 var border2 = DiagonalBlockers[i][1];
    //                 //no need to protect against OOB as diagonal move
    //                 //check ensures that blocker refs must be valid
    //                 var blocker1 = this.grid[this.x + LURDMoves[border1][0]]
    //                                         [this.y + LURDMoves[border1][1]];
    //                 var blocker2 = this.grid[this.x + LURDMoves[border2][0]]
    //                                         [this.y + LURDMoves[border2][1]];

    //                 if (!blocker1.wall || !blocker2.wall) {
    //                     //one or both are open so we can move past
    //                     this.neighbors.push(node);
    //                 }
    //             }else {
    //                 this.neighbors.push(node);
    //             }
    //         }
    //         if (node.wall) {
    //             this.neighboringWalls.push(node);
    //         }
    //     }
    // }
  }
}
