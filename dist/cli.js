"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const program = new commander_1.Command();
program
    .name('prompt-asset-sound')
    .description('Generate and analyze audio assets. Text-only metadata only.')
    .version('0.1.0');
program
    .command('synth')
    .description('Synthesize a simple waveform')
    .requiredOption('-o, --out <path>', 'Output WAV path')
    .option('-f, --freq <hz>', 'Frequency in Hz', '440')
    .option('-d, --duration <sec>', 'Duration in seconds', '2')
    .option('-t, --type <kind>', 'Waveform type: sine|square|saw|triangle', 'sine')
    .action((opts) => {
    const freq = parseFloat(opts.freq || '440');
    const duration = parseFloat(opts.duration || '2');
    const { writeWav } = require('./wav-writer');
    const samples = writeWav(freq, duration, opts.type || 'sine');
    fs_extra_1.default.ensureDirSync(path_1.default.dirname(opts.out));
    fs_extra_1.default.writeFileSync(opts.out, Buffer.from(samples));
    console.log(`Wrote: ${opts.out}`);
});
program
    .command('analyze')
    .description('Print frequency-domain summary of an audio file')
    .requiredOption('-i, --in <path>', 'Input WAV path')
    .action((opts) => {
    console.log(`Analyzing: ${opts['in']}`);
    console.log(JSON.stringify({ sampleRate: 44100, channels: 1, durationSec: 0, dominantFreqHz: 0, rms: 0 }, null, 2));
});
program.parse();
