# prompt-asset-sound

[![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Node](https://img.shields.io/badge/node-%3E%3D20-blue)]()

> Audio-only: waveform synthesis, WAV export, and frequency analysis. No text generation, no visuals.

## Overview

`prompt-asset-sound` is a CLI tool for generating procedural audio assets. It synthesizes waveforms (sine, square, sawtooth, triangle) as WAV files and provides placeholder frequency analysis. Complements `prompt-asset-drawer` in the prompt-asset product family.

**Preserves:** raw waveform fidelity, frequency-domain metadata.

**Sacrifices:** text generation, visual rendering, real-time playback.

## Installation

```bash
npm install -g prompt-asset-sound
```

## Usage

### Synthesize a waveform

```bash
# 440 Hz sine wave, 2 seconds
prompt-asset-sound synth --out output.wav

# 220 Hz square wave, 5 seconds
prompt-asset-sound synth --out bass.wav --freq 220 --duration 5 --type square
```

### Analyze a WAV file

```bash
prompt-asset-sound analyze --in output.wav
```

### CLI options

#### `synth`

| Option        | Default | Description                              |
|---------------|---------|------------------------------------------|
| `-o, --out`   | (required) | Output WAV path                      |
| `-f, --freq`  | `440`   | Frequency in Hz                          |
| `-d, --duration` | `2`  | Duration in seconds                      |
| `-t, --type`  | `sine`  | Waveform: `sine`, `square`, `saw`, `triangle` |

#### `analyze`

| Option       | Default | Description            |
|--------------|---------|------------------------|
| `-i, --in`   | (required) | Input WAV path     |

## Development

```bash
npm install
npm run build    # tsc
npm test         # vitest
```

---

**Ecosystem:** prompt-asset family / Vinculum  
**Status:** v0.1.0-alpha — active development
