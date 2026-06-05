export function writeWav(freqHz: number, durationSec: number, type: string): number[] {
  const sampleRate = 44100;
  const n = Math.floor(sampleRate * durationSec);
  const phase = (t: number) => {
    switch (type) {
      case 'square': return Math.sign(Math.sin(2 * Math.PI * freqHz * t));
      case 'saw': return 2 * ((freqHz * t) % 1) - 1;
      case 'triangle': return 2 * Math.abs(2 * ((freqHz * t) % 1) - 1) - 1;
      default: return Math.sin(2 * Math.PI * freqHz * t);
    }
  };
  return Array.from({ length: n }, (_, i) => phase(i / sampleRate));
}
