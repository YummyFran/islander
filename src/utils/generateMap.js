import { noise } from './perlin';

export const generateMap = (size, seed = Math.random()) => {
    noise.seed(seed);
    // Create the map with given size
    const map = Array.from({ length: Math.floor(size) }, () => Array(Math.floor(size)).fill(0));

    // Generate perlin noise for each cell in the map
    const offset = 0.1
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) { 
            map[i][j] = Math.round(Math.abs(noise.perlin2(i*offset, j*offset)) * 2);
        }
    }

    // Function to perform Breadth-First Search (BFS) and find connected islands in the map
    function bfs(i, j, visited, matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const queue = [[i, j]];
        visited[i][j] = true;
        const islandPoints = [[i, j]];

        while (queue.length) {
            const [x, y] = queue.shift();
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && matrix[nx][ny] === 1 && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                    islandPoints.push([nx, ny]);
                }
            }
        }

        return islandPoints;
    }

    // Function to find all the connected islands in the map
    function findIslands(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const islands = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (matrix[i][j] === 1 && !visited[i][j]) {
                    islands.push(bfs(i, j, visited, matrix));
                }
            }
        }

        return islands;
    }

    // Function to find the nearest points between two islands
    function findNearestPoints(islands) {
        let minDistance = Infinity;
        let pair = null;

        for (let i = 0; i < islands.length; i++) {
            for (let j = i + 1; j < islands.length; j++) {
                for (const pointI of islands[i]) {
                    for (const pointJ of islands[j]) {
                        const distance = Math.abs(pointI[0] - pointJ[0]) + Math.abs(pointI[1] - pointJ[1]);
                        if (distance < minDistance) {
                            minDistance = distance;
                            pair = [pointI, pointJ];
                        }
                    }
                }
            }
        }

        return pair;
    }

    // Function to connect the islands in the map and create bridges between them
    function connectIslands(matrix) {
        const islands = findIslands(matrix);

        if (islands.length < 2) {
            return matrix;
        }

        const edges = [];
        for (let i = 0; i < islands.length; i++) {
            for (let j = i + 1; j < islands.length; j++) {
                const [pointA, pointB] = findNearestPoints([islands[i], islands[j]]);
                const distance = Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
                edges.push([i, j, distance]); // Store the edge between islands i and j with the distance.
            }
        }

        edges.sort((a, b) => a[2] - b[2]); // Sort edges based on distance.

        const parent = Array(islands.length).fill(-1); // Initialize an array to keep track of the parent of each island.

        // Function to find the root parent of an island
        const find = (i) => (parent[i] === -1 ? i : find(parent[i]));

        // Function to union two islands under the same parent
        const union = (i, j) => {
            const root_i = find(i);
            const root_j = find(j);
            parent[root_j] = root_i;
        };

        for (const [i, j, distance] of edges) {
            if (find(i) !== find(j)) {
                union(i, j);
                const [pointA, pointB] = findNearestPoints([islands[i], islands[j]]);
                for (let k = Math.min(pointA[0], pointB[0]); k <= Math.max(pointA[0], pointB[0]); k++) {
                    matrix[k][pointA[1]] = 2;
                }
                for (let k = Math.min(pointA[1], pointB[1]); k <= Math.max(pointA[1], pointB[1]); k++) {
                    matrix[pointB[0]][k] = 2;
                }
            }
        }

        return matrix;
    }

    // Connect the islands and return the final map
    return connectIslands(map);
};
