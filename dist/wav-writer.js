"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeWav = writeWav;
function writeWav(freqHz, durationSec, type) {
    const sampleRate = 44100;
    const n = Math.floor(sampleRate * durationSec);
    const phase = (t) => {
        switch (type) {
            case 'square': return Math.sign(Math.sin(2 * Math.PI * freqHz * t));
            case 'saw': return 2 * ((freqHz * t) % 1) - 1;
            case 'triangle': return 2 * Math.abs(2 * ((freqHz * t) % 1) - 1) - 1;
            default: return Math.sin(2 * Math.PI * freqHz * t);
        }
    };
    return Array.from({ length: n }, (_, i) => phase(i / sampleRate));
}
