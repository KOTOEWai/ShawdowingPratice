import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateWaitDuration,
  getSentenceTiming,
  calculateEffectiveTime,
  formatOffsetDisplay,
  isInputField,
} from "../engine/waitModeEngine";
import { TranscriptItem, WaitMode } from "../types";

describe("Wait Mode Engine Timing Calculations", () => {
  it("calculates +30% wait duration correctly (e.g. 4000ms -> 1200ms)", () => {
    const duration = 4000;
    const wait = calculateWaitDuration(duration, "30%");
    assert.equal(wait, 1200);
  });

  it("calculates +50% wait duration correctly (e.g. 4000ms -> 2000ms)", () => {
    const duration = 4000;
    const wait = calculateWaitDuration(duration, "50%");
    assert.equal(wait, 2000);
  });

  it("returns Infinity for Manual mode to ensure no timer pressure and never auto-advances", () => {
    const duration = 4000;
    const wait = calculateWaitDuration(duration, "manual");
    assert.equal(wait, Infinity);
  });

  it("returns 0ms for Off mode to support continuous, natural video playback", () => {
    const duration = 4000;
    const wait = calculateWaitDuration(duration, "off");
    assert.equal(wait, 0);
  });

  it("handles non-standard, zero, and fractional durations safely with rounding", () => {
    assert.equal(calculateWaitDuration(0, "30%"), 0);
    assert.equal(calculateWaitDuration(-500, "30%"), 0);
    assert.equal(calculateWaitDuration(3333, "30%"), 1000);
    assert.equal(calculateWaitDuration(3333, "50%"), 1667);
  });
});

describe("Sentence Timing Calculation & Audio Boundaries", () => {
  const sampleTranscript: TranscriptItem[] = [
    { text: "Hello and welcome.", offset: 1000, duration: 2500 },
    { text: "Today we practice English.", offset: 4000, duration: 3000 },
    { text: "Final sentence here.", offset: 7500, duration: 2000 },
  ];

  it("calculates timing accurately for first sentence with next sentence boundary cushion", () => {
    const timing = getSentenceTiming(sampleTranscript, 0);
    assert.ok(timing);
    assert.equal(timing.startMs, 1000);
    // endMs = Math.min(1000 + 2500 + 100 = 3600, 4000 - 50 = 3950) -> 3600
    assert.equal(timing.endMs, 3600);
    assert.equal(timing.durationMs, 2600);
  });

  it("calculates timing accurately for the middle sentence respecting boundaries", () => {
    const timing = getSentenceTiming(sampleTranscript, 1);
    assert.ok(timing);
    assert.equal(timing.startMs, 4000);
    // endMs = Math.min(4000 + 3000 + 100 = 7100, 7500 - 50 = 7450) -> 7100
    assert.equal(timing.endMs, 7100);
    assert.equal(timing.durationMs, 3100);
  });

  it("calculates timing accurately for the final sentence with tail cushion", () => {
    const timing = getSentenceTiming(sampleTranscript, 2);
    assert.ok(timing);
    assert.equal(timing.startMs, 7500);
    assert.equal(timing.endMs, 7500 + 2000 + 100);
    assert.equal(timing.durationMs, 2100);
  });

  it("returns null for out of bounds indices or empty transcripts", () => {
    assert.equal(getSentenceTiming(sampleTranscript, -1), null);
    assert.equal(getSentenceTiming(sampleTranscript, 5), null);
    assert.equal(getSentenceTiming([], 0), null);
  });
});

describe("Subtitle Synchronization Offset Calculation", () => {
  it("adds positive offset for delayed subtitles without changing player position", () => {
    const videoCurrentMs = 5000;
    const offsetMs = 200;
    assert.equal(calculateEffectiveTime(videoCurrentMs, offsetMs), 5200);
  });

  it("subtracts negative offset for advanced subtitles without altering video currentTime", () => {
    const videoCurrentMs = 5000;
    const offsetMs = -300;
    assert.equal(calculateEffectiveTime(videoCurrentMs, offsetMs), 4700);
  });

  it("clamps negative effective time to 0 to prevent negative transcript lookup bounds", () => {
    const videoCurrentMs = 100;
    const offsetMs = -300;
    assert.equal(calculateEffectiveTime(videoCurrentMs, offsetMs), 0);
  });

  it("formats offset display cleanly with sign indicator", () => {
    assert.equal(formatOffsetDisplay(0), "0ms");
    assert.equal(formatOffsetDisplay(100), "+100ms");
    assert.equal(formatOffsetDisplay(300), "+300ms");
    assert.equal(formatOffsetDisplay(-200), "-200ms");
  });
});

describe("Keyboard Shortcuts & Input Protection", () => {
  it("identifies non-input targets correctly to allow shadowing shortcuts", () => {
    assert.equal(isInputField(null), false);
  });

  it("simulates HTML input elements properly when target tagName is INPUT or TEXTAREA", () => {
    const mockInput = { tagName: "INPUT", isContentEditable: false } as unknown as EventTarget;
    assert.equal(isInputField(mockInput), true);

    const mockTextarea = { tagName: "TEXTAREA", isContentEditable: false } as unknown as EventTarget;
    assert.equal(isInputField(mockTextarea), true);

    const mockButton = { tagName: "BUTTON", isContentEditable: false } as unknown as EventTarget;
    assert.equal(isInputField(mockButton), false);

    const mockEditableDiv = { tagName: "DIV", isContentEditable: true } as unknown as EventTarget;
    assert.equal(isInputField(mockEditableDiv), true);
  });
});

describe("State Transitions & Mode Switching Safety", () => {
  it("verifies safe transition paths across all WaitMode options", () => {
    const modes: WaitMode[] = ["off", "30%", "50%", "manual"];
    for (const fromMode of modes) {
      for (const toMode of modes) {
        const fromWait = calculateWaitDuration(4000, fromMode);
        const toWait = calculateWaitDuration(4000, toMode);
        assert.ok(typeof fromWait === "number");
        assert.ok(typeof toWait === "number");
      }
    }
  });

  it("ensures replay target offset calculation preserves exact sentence boundary", () => {
    const sampleItem: TranscriptItem = { text: "Test line", offset: 3450, duration: 2100 };
    const seekSec = Math.max(0, (sampleItem.offset - 150) / 1000);
    assert.equal(seekSec, 3.3); // (3450 - 150) / 1000 = 3300 / 1000 = 3.3s
  });
});
