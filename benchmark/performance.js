/**
 * FRAYMUS Performance Benchmark
 * Compares standard operations vs Phi-harmonic operations
 * 
 * Run with: node benchmark/performance.js
 */

const PhiHarmonic = require('../lib/phi-harmonic');

class PerformanceBenchmark {
    constructor() {
        this.phi = new PhiHarmonic();
        this.results = [];
    }

    /**
     * Benchmark matrix multiplication
     */
    benchmarkMatrixMultiply() {
        const size = 100;
        const iterations = 1000;

        // Standard matrix multiplication
        const startStandard = performance.now();
        for (let i = 0; i < iterations; i++) {
            this.standardMatrixMultiply(size);
        }
        const endStandard = performance.now();
        const standardTime = endStandard - startStandard;

        // Phi-harmonic matrix multiplication
        const startPhi = performance.now();
        for (let i = 0; i < iterations; i++) {
            this.phiMatrixMultiply(size);
        }
        const endPhi = performance.now();
        const phiTime = endPhi - startPhi;

        const improvement = ((standardTime - phiTime) / standardTime * 100).toFixed(2);

        this.results.push({
            test: 'Matrix Multiply (100x100)',
            standard: `${standardTime.toFixed(2)}ms`,
            phi: `${phiTime.toFixed(2)}ms`,
            improvement: `${improvement}%`
        });

        console.log(`Matrix Multiply: Standard=${standardTime.toFixed(2)}ms, Phi=${phiTime.toFixed(2)}ms, Improvement=${improvement}%`);
    }

    /**
     * Standard matrix multiplication
     */
    standardMatrixMultiply(size) {
        const A = this.randomMatrix(size);
        const B = this.randomMatrix(size);
        const C = new Array(size).fill(0).map(() => new Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }

    /**
     * Phi-harmonic matrix multiplication
     */
    phiMatrixMultiply(size) {
        const A = this.phi.initWeights(size, size);
        const B = this.phi.initWeights(size, size);
        const C = new Array(size).fill(0).map(() => new Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let k = 0; k < size; k++) {
                    C[i][j] += A[i][k] * B[k][j] * this.phi.PHI_INVERSE;
                }
            }
        }
        return C;
    }

    /**
     * Benchmark vector operations
     */
    benchmarkVectorOperations() {
        const dimensions = 16384;
        const iterations = 100;

        // Standard vector binding
        const startStandard = performance.now();
        for (let i = 0; i < iterations; i++) {
            const a = this.randomVector(dimensions);
            const b = this.randomVector(dimensions);
            this.standardBind(a, b);
        }
        const endStandard = performance.now();
        const standardTime = endStandard - startStandard;

        // Phi-harmonic vector binding
        const startPhi = performance.now();
        for (let i = 0; i < iterations; i++) {
            const a = this.phi.randomVector(dimensions);
            const b = this.phi.randomVector(dimensions);
            this.phi.bind(a, b);
        }
        const endPhi = performance.now();
        const phiTime = endPhi - startPhi;

        const improvement = ((standardTime - phiTime) / standardTime * 100).toFixed(2);

        this.results.push({
            test: 'Vector Binding (16384-D)',
            standard: `${standardTime.toFixed(2)}ms`,
            phi: `${phiTime.toFixed(2)}ms`,
            improvement: `${improvement}%`
        });

        console.log(`Vector Binding: Standard=${standardTime.toFixed(2)}ms, Phi=${phiTime.toFixed(2)}ms, Improvement=${improvement}%`);
    }

    /**
     * Standard vector binding
     */
    standardBind(a, b) {
        const n = Math.max(a.length, b.length);
        const result = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[(i + j) % n] += a[i] * b[j];
            }
        }
        return result;
    }

    /**
     * Benchmark memory allocation
     */
    benchmarkMemoryAllocation() {
        const sizes = [100, 1000, 10000];
        const iterations = 1000;

        for (const size of sizes) {
            // Standard allocation
            const startStandard = performance.now();
            for (let i = 0; i < iterations; i++) {
                new Array(size).fill(0);
            }
            const endStandard = performance.now();
            const standardTime = endStandard - startStandard;

            // Phi-harmonic allocation
            const startPhi = performance.now();
            for (let i = 0; i < iterations; i++) {
                const phiSize = this.phi.allocateMemory(size);
                new Array(phiSize).fill(0);
            }
            const endPhi = performance.now();
            const phiTime = endPhi - startPhi;

            const improvement = ((standardTime - phiTime) / standardTime * 100).toFixed(2);

            this.results.push({
                test: `Memory Allocation (${size})`,
                standard: `${standardTime.toFixed(2)}ms`,
                phi: `${phiTime.toFixed(2)}ms`,
                improvement: `${improvement}%`
            });

            console.log(`Memory (${size}): Standard=${standardTime.toFixed(2)}ms, Phi=${phiTime.toFixed(2)}ms, Improvement=${improvement}%`);
        }
    }

    /**
     * Generate random matrix
     */
    randomMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(Math.random());
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
     * Generate random vector
     */
    randomVector(dimensions) {
        const vector = new Array(dimensions);
        for (let i = 0; i < dimensions; i++) {
            vector[i] = Math.random() < 0.5 ? 1 : -1;
        }
        return vector;
    }

    /**
     * Run all benchmarks
     */
    runAll() {
        console.log('=== FRAYMUS Performance Benchmark ===\n');
        console.log('Running Matrix Multiply benchmark...');
        this.benchmarkMatrixMultiply();
        console.log('\nRunning Vector Operations benchmark...');
        this.benchmarkVectorOperations();
        console.log('\nRunning Memory Allocation benchmark...');
        this.benchmarkMemoryAllocation();
        console.log('\n=== Benchmark Results ===');
        this.printResults();
    }

    /**
     * Print results table
     */
    printResults() {
        console.log('\n' + '-'.repeat(80));
        console.log('Test'.padEnd(30) + 'Standard'.padEnd(15) + 'Phi-Harmonic'.padEnd(15) + 'Improvement');
        console.log('-'.repeat(80));
        for (const result of this.results) {
            console.log(
                result.test.padEnd(30) +
                result.standard.padEnd(15) +
                result.phi.padEnd(15) +
                result.improvement
            );
        }
        console.log('-'.repeat(80));
    }
}

// Run benchmarks if executed directly
if (require.main === module) {
    const benchmark = new PerformanceBenchmark();
    benchmark.runAll();
}

module.exports = PerformanceBenchmark;
