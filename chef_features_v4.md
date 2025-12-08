# Phase 45: Master Chef Utilities (Proposal)

Here are practical, high-impact features we can add to the Chef Dashboard to further improve kitchen efficiency and safety.

## 1. ⚠️ Allergy & Dietary Safety System (Critical)
**Why:** Safety is #1. Chefs need to know *instantly* if an order is Jain, Vegan, or has a specific allergy.
**Feature:**
- **Auto-Tagging:** If an item is "Jain Vada Pav", automatically tag it as [JAIN].
- **Visual Alarm:** If a customer adds a note like "Peanut Allergy", the card turns **Purple** and flashes.
- **Icons:** Big icons for 🥜 (Nuts), 🥛 (Dairy), 🥬 (Vegan).

## 2. 📋 Daily Mise-en-place (Prep) Checklist
**Why:** A kitchen is only as fast as its prep. Chefs need to track what's ready before the rush starts.
**Feature:**
- A "Prep" tab alongside Active/History/Stats.
- Checklist: "Chop Onions (5kg)", "Make Chutney (2L)", "Boil Potatoes".
- Progress bar: "Kitchen is 80% Ready for Dinner Service".

## 3. 🔔 Waiter Paging / "Call Server"
**Why:** Sometimes the chef needs to ask the waiter a question ("Did they want spicy?") or tell them something ("Tell table 5 it will be 5 mins late").
**Feature:**
- A "Call Waiter" button on the order card.
- Sends a notification to the POS/Waiter app (mocked for now).

## 4. 📉 Low Stock "86" Warning
**Why:** "Out of Stock" is too late. Chefs need to warn when they are *running low*.
**Feature:**
- "Low Stock" button (Yellow status).
- Shows "Only 5 left!" on the ordering menu (mocked).

## 5. 🗣️ Shift Handoff Log
**Why:** Morning shift needs to tell Evening shift important info.
**Feature:**
- A digital whiteboard/notepad in the dashboard.
- "Fryer oil changed today", "Ran out of cilantro", "Oven 2 is acting weird".

## 6. ⏱️ Item-Level Timers
**Why:** Different items take different times.
**Feature:**
- Individual timers for each item in an order.
- e.g., "Pizza (15m)" starts counting down, but "Coke (1m)" stays gray until the end.
