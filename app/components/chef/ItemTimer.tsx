'use client';
import React, { useState, useEffect, useRef } from 'react';

interface ItemTimerProps {
    id: string; // Unique key: orderId-itemIndex
}

export default function ItemTimer({ id }: ItemTimerProps) {
    const [targetTime, setTargetTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [isExpired, setIsExpired] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    // Load from storage on mount
    useEffect(() => {
        const key = `timer-${id}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const target = parseInt(stored);
            if (target > Date.now()) {
                setTargetTime(target);
            } else {
                // Already done?
                // Just clear it for now or mark expired if very recent?
                // valid for 5 mins after expiry
                if (Date.now() - target < 5 * 60000) {
                    setIsExpired(true);
                } else {
                    localStorage.removeItem(key);
                }
            }
        }
    }, [id]);

    // Timer Interval
    useEffect(() => {
        if (!targetTime) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = targetTime - now;

            if (diff <= 0) {
                setIsExpired(true);
                setTargetTime(null);
                setTimeLeft(null);
                localStorage.removeItem(`timer-${id}`);
                // Play sound
                try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    osc.connect(ctx.destination);
                    osc.frequency.value = 800;
                    osc.start();
                    osc.stop(ctx.currentTime + 0.5);
                } catch (e) { }
            } else {
                const mins = Math.floor(diff / 60000);
                const secs = Math.floor((diff % 60000) / 1000);
                setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime, id]);

    const startTimer = (minutes: number) => {
        const target = Date.now() + minutes * 60000;
        setTargetTime(target);
        localStorage.setItem(`timer-${id}`, target.toString());
        setShowPicker(false);
        setIsExpired(false);
    };

    const stopTimer = () => {
        setTargetTime(null);
        setTimeLeft(null);
        setIsExpired(false);
        localStorage.removeItem(`timer-${id}`);
    };

    if (isExpired) {
        return (
            <button
                onClick={stopTimer}
                className="animate-pulse bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg"
            >
                DONE! ✖
            </button>
        );
    }

    if (targetTime) {
        return (
            <button
                onClick={stopTimer}
                className="bg-orange-100 text-orange-600 border border-orange-200 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 hover:bg-red-50 hover:text-red-500"
            >
                ⏳ {timeLeft} <span className="text-[10px] opacity-50 ml-1">✖</span>
            </button>
        );
    }

    if (showPicker) {
        return (
            <div className="flex items-center gap-1 bg-white shadow-lg border rounded-lg p-1 absolute z-20 mt-1">
                {[5, 10, 15, 20].map(m => (
                    <button
                        key={m}
                        onClick={() => startTimer(m)}
                        className="px-2 py-1 hover:bg-gray-100 rounded text-xs font-bold text-gray-700"
                    >
                        {m}m
                    </button>
                ))}
                <button onClick={() => setShowPicker(false)} className="text-gray-400 px-1 text-xs">✕</button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowPicker(true)}
            className="text-gray-300 hover:text-orange-500 transition-colors"
            title="Set Timer"
        >
            ⏱️
        </button>
    );
}
