/**
 * FRAYMUS Phi-Harmonic Mathematics Library
 * Zero-dependency mathematical primitives based on the golden ratio
 * 
 * @author eyeoverthink
 * @version 1.0.0
 */

class PhiHarmonic {
    constructor() {
        // Golden ratio constant
        this.PHI = 1.618033988749895;
        this.PHI_SQUARED = this.PHI * this.PHI; // 2.618...
        this.PHI_INVERSE = 1 / this.PHI; // 0.618...
        this.PHI_CUBED = this.PHI * this.PHI * this.PHI; // 4.236...
        this.PHI_INVERSE_SQUARED = this.PHI_INVERSE * this.PHI_INVERSE; // 0.381...
    }

    /**
     * Generate phi-harmonic sequence
     * @param {number} n - Number of terms to generate
     * @returns {number[]} Array of phi-harmonic values
     */
    phiSequence(n) {
        const sequence = [];
        for (let i = 0; i < n; i++) {
            sequence.push(Math.pow(this.PHI, i));
        }
        return sequence;
    }

    /**
     * Phi-modulated weight initialization for neural networks
     * Creates mathematically coherent weight matrices
     * @param {number} rows - Number of rows
     * @param {number} cols - Number of columns
     * @returns {number[][]} Weight matrix
     */
    initWeights(rows, cols) {
        const weights = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const value = this.PHI * Math.sin(this.PHI * i) * Math.cos(this.PHI * j);
                row.push(value);
            }
            weights.push(row);
        }
        return weights;
    }

    /**
     * Phi-harmonic attention mechanism
     * @param {number[]} query - Query vector
     * @param {number[]} key - Key vector
     * @returns {number} Attention score
     */
    phiAttention(query, key) {
        let score = 0;
        for (let i = 0; i < query.length; i++) {
            score += query[i] * key[i] * Math.pow(this.PHI, i % 5);
        }
        return score / query.length;
    }

    /**
     * Phi-based memory block allocation
     * @param {number} size - Requested size
     * @returns {number} Phi-coherent allocated size
     */
    allocateMemory(size) {
        const phiBlock = Math.ceil(size * this.PHI);
        return Math.pow(2, Math.ceil(Math.log2(phiBlock)));
    }

    /**
     * Phi-harmonic frame timing for rendering
     * @param {number} targetFPS - Target frames per second
     * @returns {number} Phi-coherent frame interval in ms
     */
    frameInterval(targetFPS = 60) {
        const baseInterval = 1000 / targetFPS;
        return baseInterval * this.PHI_INVERSE;
    }

    /**
     * Fibonacci sequence (closely related to phi)
     * @param {number} n - Number of terms
     * @returns {number[]} Fibonacci sequence
     */
    fibonacci(n) {
        const sequence = [0, 1];
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence;
    }

    /**
     * Check if two values are phi-coherent (ratio approximates phi)
     * @param {number} a - First value
     * @param {number} b - Second value
     * @param {number} tolerance - Acceptable deviation (default 0.01)
     * @returns {boolean} True if phi-coherent
     */
    isPhiCoherent(a, b, tolerance = 0.01) {
        if (b === 0) return false;
        const ratio = a / b;
        return Math.abs(ratio - this.PHI) < tolerance;
    }

    /**
     * Phi-harmonic interpolation
     * @param {number} a - Start value
     * @param {number} b - End value
     * @param {number} t - Interpolation factor (0-1)
     * @returns {number} Interpolated value
     */
    phiInterpolate(a, b, t) {
        const phiT = t * this.PHI_INVERSE;
        return a + (b - a) * phiT;
    }

    /**
     * Hyper-dimensional vector binding (circular convolution)
     * @param {number[]} a - First vector
     * @param {number[]} b - Second vector
     * @returns {number[]} Bound vector
     */
    bind(a, b) {
        const n = Math.max(a.length, b.length);
        const result = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[(i + j) % n] += (a[i] || 0) * (b[j] || 0);
            }
        }
        return result;
    }

    /**
     * Hyper-dimensional vector unbinding (approximate inverse)
     * @param {number[]} bound - Bound vector
     * @param {number[]} key - Key vector
     * @returns {number[]} Unbound vector
     */
    unbind(bound, key) {
        const n = bound.length;
        const result = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                result[(i - j + n) % n] += bound[i] * (key[j] || 0);
            }
        }
        return result;
    }

    /**
     * Hyper-dimensional vector bundling (superposition)
     * @param {number[]} vectors - Array of vectors to bundle
     * @returns {number[]} Bundled vector
     */
    bundle(...vectors) {
        const maxLength = Math.max(...vectors.map(v => v.length));
        const result = new Array(maxLength).fill(0);
        for (const vector of vectors) {
            for (let i = 0; i < vector.length; i++) {
                result[i] += vector[i];
            }
        }
        return result;
    }

    /**
     * Generate random hyper-dimensional vector
     * @param {number} dimensions - Vector dimensions (default 16384)
     * @returns {number[]} Random vector
     */
    randomVector(dimensions = 16384) {
        const vector = new Array(dimensions);
        for (let i = 0; i < dimensions; i++) {
            vector[i] = Math.random() < 0.5 ? 1 : -1;
        }
        return vector;
    }

    /**
     * Phi-harmonic mutation probability
     * @param {number} generation - Current generation
     * @returns {number} Mutation probability
     */
    mutationProbability(generation) {
        return 0.1 * Math.pow(this.PHI_INVERSE, generation % 10);
    }

    /**
     * Calculate phi-coherence score for a system
     * @param {Object} metrics - System metrics
     * @returns {number} Coherence score (0-1)
     */
    calculateCoherence(metrics) {
        let coherence = 0;
        let count = 0;

        if (metrics.rendering !== undefined) {
            coherence += this.isPhiCoherent(metrics.rendering, 60) ? 1 : 0;
            count++;
        }
        if (metrics.memory !== undefined) {
            coherence += this.isPhiCoherent(metrics.memory, this.allocateMemory(1000)) ? 1 : 0;
            count++;
        }
        if (metrics.compute !== undefined) {
            coherence += this.isPhiCoherent(metrics.compute, 100) ? 1 : 0;
            count++;
        }

        return count > 0 ? coherence / count : 0;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhiHarmonic;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.PhiHarmonic = PhiHarmonic;
}
