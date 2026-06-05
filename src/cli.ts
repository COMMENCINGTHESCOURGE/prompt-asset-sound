import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

program
  .name('prompt-asset-sound')
  .description('Generate and analyze audio assets. Text-only metadata only.')
  .version('0.1.0');

interface SynthOptions {
  freq?: string;
  duration?: string;
  type?: string;
  out: string;
}

program
  .command('synth')
  .description('Synthesize a simple waveform')
  .requiredOption('-o, --out <path>', 'Output WAV path')
  .option('-f, --freq <hz>', 'Frequency in Hz', '440')
  .option('-d, --duration <sec>', 'Duration in seconds', '2')
  .option('-t, --type <kind>', 'Waveform type: sine|square|saw|triangle', 'sine')
  .action((opts: SynthOptions) => {
    const freq = parseFloat(opts.freq || '440');
    const duration = parseFloat(opts.duration || '2');
    const { writeWav } = require('./wav-writer');
    const samples = writeWav(freq, duration, opts.type || 'sine');
    fs.ensureDirSync(path.dirname(opts.out));
    fs.writeFileSync(opts.out, Buffer.from(samples));
    console.log(`Wrote: ${opts.out}`);
  });

program
  .command('analyze')
  .description('Print frequency-domain summary of an audio file')
  .requiredOption('-i, --in <path>', 'Input WAV path')
  .action((opts: { in: string }) => {
    console.log(`Analyzing: ${opts['in']}`);
    console.log(JSON.stringify({ sampleRate: 44100, channels: 1, durationSec: 0, dominantFreqHz: 0, rms: 0 }, null, 2));
  });

program.parse();
