import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function SoundToggle({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(false);
  const audio = useRef<{ ctx: AudioContext; oscillator: OscillatorNode; gain: GainNode } | null>(null);
  useEffect(() => {
    const canPlay = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAvailable(canPlay);
    if (canPlay) { try { setEnabled(sessionStorage.getItem("beacon-arc-sound") === "true"); } catch {} }
  }, []);
  useEffect(() => {
    if (!available || !enabled || !heroRef.current) return;
    const ctx = new AudioContext(); const oscillator = ctx.createOscillator(); const gain = ctx.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = 112; gain.gain.value = 0.018; oscillator.connect(gain).connect(ctx.destination); oscillator.start(); audio.current = { ctx, oscillator, gain };
    const onMove = (event: PointerEvent) => { const box = heroRef.current?.getBoundingClientRect(); if (!box) return; const x = Math.max(0, Math.min(1, (event.clientX-box.left)/box.width)); const y = Math.max(0, Math.min(1, (event.clientY-box.top)/box.height)); oscillator.frequency.setTargetAtTime(92+x*88, ctx.currentTime, .18); gain.gain.setTargetAtTime(.008+(1-y)*.018, ctx.currentTime, .22); };
    const node = heroRef.current; node.addEventListener("pointermove", onMove);
    return () => { node.removeEventListener("pointermove", onMove); gain.gain.setTargetAtTime(0, ctx.currentTime, .03); window.setTimeout(() => { oscillator.stop(); void ctx.close(); }, 80); audio.current = null; };
  }, [available, enabled, heroRef]);
  if (!available) return null;
  return <Button variant="ghost" size="sm" className="border border-surface-dark-border bg-surface-dark/50 text-surface-dark-foreground hover:bg-surface-dark hover:text-primary" aria-pressed={enabled} onClick={() => { const next=!enabled; setEnabled(next); try { sessionStorage.setItem("beacon-arc-sound", String(next)); } catch {} }}>{enabled ? <Volume2/> : <VolumeX/>} Sound {enabled ? "on" : "off"}</Button>;
}
