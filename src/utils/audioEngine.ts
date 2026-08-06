// Genuine Web Audio API romantic piano synthesizer built from scratch
// Chord progression: Am -> F -> C -> G
// Arpeggiated sequence with bass octave, chord tones, and beat-3 melody

export class RomanticPianoEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentBar: number = 0;
  private bpm: number = 66; // Slow, expressive tempo

  // Frequency mapping for piano notes
  private noteFreqs: Record<string, number> = {
    // Bass notes
    'A1': 55.00, 'F1': 43.65, 'C2': 65.41, 'G1': 49.00,
    'A2': 110.00, 'F2': 87.31, 'C3': 130.81, 'G2': 97.99,
    
    // Chord notes (3rd octave / 4th octave)
    'C3_b': 130.81, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,

    // Melody notes (5th octave)
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
  };

  // 4-bar progression definitions
  private progression = [
    // Bar 0: Am
    {
      bass: ['A1', 'A2'],
      chord: ['A3', 'C4', 'E4'],
      melodyBeat3: 'E5',
      melodyBeat4: 'C5'
    },
    // Bar 1: F
    {
      bass: ['F1', 'F2'],
      chord: ['F3', 'A3', 'C4'],
      melodyBeat3: 'F5',
      melodyBeat4: 'C5'
    },
    // Bar 2: C
    {
      bass: ['C2', 'C3'],
      chord: ['C3', 'E3', 'G3'],
      melodyBeat3: 'G5',
      melodyBeat4: 'E5'
    },
    // Bar 3: G
    {
      bass: ['G1', 'G2'],
      chord: ['G3', 'B3', 'D4'],
      melodyBeat3: 'D5',
      melodyBeat4: 'B4'
    }
  ];

  private initContext() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master Gain for smooth 2.5s fade-in / fade-out
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // Create Convolution Reverb Buffer for warm hall ambience
    this.reverbNode = this.ctx.createConvolver();
    this.reverbNode.buffer = this.createImpulseResponse(this.ctx, 2.8, 2.2);

    // Wet/Dry mix setup
    const dryGain = this.ctx.createGain();
    const wetGain = this.ctx.createGain();
    dryGain.gain.value = 0.75;
    wetGain.gain.value = 0.45;

    this.masterGain.connect(dryGain);
    dryGain.connect(this.ctx.destination);

    this.masterGain.connect(this.reverbNode);
    this.reverbNode.connect(wetGain);
    wetGain.connect(this.ctx.destination);
  }

  // Synthesize an impulse response buffer for acoustic hall reverb
  private createImpulseResponse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = rate * duration;
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = i / length;
      const factor = Math.pow(1 - n, decay);
      left[i] = (Math.random() * 2 - 1) * factor;
      right[i] = (Math.random() * 2 - 1) * factor;
    }
    return impulse;
  }

  // Synthesize a piano key note with triangle + sine blend and exponential envelope
  private playPianoNote(noteName: string, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.noteFreqs[noteName];
    if (!freq) return;

    // Body Oscillator (Triangle wave for rich fundamental)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warmth Oscillator (Sine wave tuned slightly warm)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.0008, startTime); // subtle detune for warmth

    // Note Envelope
    const noteGain = this.ctx.createGain();
    // Soft attack
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(Math.min(0.25, velocity * 0.35), startTime + 0.025);
    // Natural decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Filter to soften high harmonics like felt hammers
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq > 400 ? 2200 : 1200, startTime);
    filter.Q.setValueAtTime(1.0, startTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // Schedule one bar of the Am -> F -> C -> G progression
  private playBar(barIndex: number, startTime: number) {
    const barData = this.progression[barIndex % 4];
    const secondsPerBeat = 60 / this.bpm; // ~0.9 seconds per beat in 4/4 time

    // Beat 1: Octave Bass Note
    this.playPianoNote(barData.bass[0], startTime, secondsPerBeat * 3.5, 0.6);
    this.playPianoNote(barData.bass[1], startTime + 0.05, secondsPerBeat * 3.2, 0.45);

    // Arpeggiated Chord Tones across beats 1, 1.5, 2, 2.5
    const chord = barData.chord;
    this.playPianoNote(chord[0], startTime + secondsPerBeat * 0.4, secondsPerBeat * 2.5, 0.35);
    this.playPianoNote(chord[1], startTime + secondsPerBeat * 0.8, secondsPerBeat * 2.2, 0.38);
    this.playPianoNote(chord[2], startTime + secondsPerBeat * 1.2, secondsPerBeat * 2.0, 0.35);
    this.playPianoNote(chord[0], startTime + secondsPerBeat * 1.6, secondsPerBeat * 1.8, 0.32);

    // Beat 3: Expressive High Melody Note
    this.playPianoNote(barData.melodyBeat3, startTime + secondsPerBeat * 2.0, secondsPerBeat * 2.2, 0.55);

    // Beat 4: Passing Melody / Complement Note
    this.playPianoNote(barData.melodyBeat4, startTime + secondsPerBeat * 3.0, secondsPerBeat * 1.5, 0.45);
    this.playPianoNote(chord[1], startTime + secondsPerBeat * 3.2, secondsPerBeat * 1.2, 0.30);
  }

  // Start audio with gentle 2.5 second fade in
  public async start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentBar = 0;

    // Gentle 2.5-second fade in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.0001, now);
    this.masterGain.gain.linearRampToValueAtTime(0.85, now + 2.5);

    const secondsPerBar = (60 / this.bpm) * 4;

    const scheduleNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const currentTime = this.ctx.currentTime;
      this.playBar(this.currentBar, currentTime);
      this.currentBar++;

      // Schedule loop
      this.timerId = window.setTimeout(scheduleNext, secondsPerBar * 1000 - 100);
    };

    scheduleNext();
  }

  // Pause with soft 0.8s fade out
  public pause() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      this.isPlaying = false;
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }, 800);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticPiano = new RomanticPianoEngine();
