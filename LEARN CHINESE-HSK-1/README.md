# HSK 1 Studio — Chinese Vocabulary Practice

A local, beginner-friendly HSK 1 study website built with HTML, CSS, and vanilla JavaScript. The vocabulary dataset contains all 150 numbered entries from the supplied `HSK 1 Word List` PDF. The original serial numbers, Chinese forms, pinyin, and English meanings are preserved, including blank meanings where the source PDF has no English gloss.

## Features
- Character recall with hide/reveal, pinyin, meaning, and optional browser speech synthesis (`zh-CN` when available).
- Square writing canvas with Chinese practice grid, mouse/touch/stylus drawing, blue/red pens, adjustable brush, eraser, undo, and clear.
- Stroke Check mode powered by Hanzi Writer, using stroke data to give wrong-stroke and correct-stroke feedback. Requires internet access to load the library and character data; unsupported/unavailable data produces a clear error message.
- Previous/next/random navigation, word status tracking, and difficult-word review.
- Meaning, pinyin, and character-recall quizzes with instant feedback.
- Searchable, filterable vocabulary library with CSV and JSON export.
- Dashboard and practice history, saved locally in browser `localStorage`.
- Responsive desktop/tablet/mobile layout.

## Run on Windows 11
1. Extract the project folder to a location such as `Documents\hsk1-practice`.
2. Open Visual Studio Code and choose **File → Open Folder…**, then select `hsk1-practice`.
3. Open `index.html` in a browser. For the most reliable local development experience, install the free **Live Server** extension in VS Code, right-click `index.html`, and choose **Open with Live Server**.
4. No build step, package installation, account, or paid API is required. Google Fonts are optional; the interface uses system fallbacks if unavailable.

## How to use
- In **Study desk**, use Reveal Character after attempting recall. Draw in the square canvas using a mouse, touchpad, touchscreen, or stylus.
- Choose a pen color and brush size. **Undo**, **Clear canvas**, and **Try again** are available.
- Use **Status** to select Not Started, Learning, Learned, or Difficult. **Mark learned** is a shortcut.
- In **Vocabulary library**, search Chinese, pinyin, English meaning, or serial number. Click a row or Practice to open it.
- In **Quick quiz**, choose Meaning, Pinyin, or Character Recall. Correct quiz answers are recorded as learned; incorrect answers are recorded as practice.
- In **My progress**, review totals and recent activity. Export JSON or CSV for a backup.

## Progress storage and backup
Progress is saved to localStorage in the current browser profile. It does not sync between devices or browsers. Use the export button before clearing browser data. The Reset button asks for confirmation before clearing saved progress; it never deletes the vocabulary dataset.

## Editing vocabulary
Edit `data/hsk1-vocabulary.json` as the human-readable source, then update `js/vocabulary.js` to match it (the latter is the dataset loaded by the app). Keep each `serialNumber`, `character`, `pinyin`, and `meaning` property. The project currently includes the full 150-entry dataset in both files to keep the website usable without fetch/CORS issues when opening locally.

## Source notes and verification
- Source: uploaded `HSK 1 Word List` PDF (9 pages), whose numbered entries run from 1 to 150.
- Extracted dataset count: **150 entries**; serial numbers are consecutive 1–150.
- PDF entries 39–42 (`的`, `了`, `吗`, `呢`) have no English meaning printed in the source list; their `meaning` values are intentionally empty rather than filled in from outside knowledge.
- Some PDF wording is unusual but intentionally preserved (for example, `什么` is listed as “what, why”; `中国` pinyin appears as `Zhōngguò`; `衣服` meaning is “cloth”; and `里` is listed with pinyin `lǐmiàn`). Verify against your teacher's preferred source if you intend to correct these.
- Stroke-order data is not included, so the writing guide displays an explanatory notice instead of a fabricated animation.
