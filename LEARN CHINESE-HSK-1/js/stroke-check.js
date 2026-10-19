'use strict';
/* Uses Hanzi Writer's verified stroke data to provide real stroke-order feedback. */
const StrokeCheck = (() => {
  const $ = id => document.getElementById(id);
  let writer = null;
  let chars = [];
  let charIndex = 0;
  let active = false;

  function feedback(message, type = '') {
    const el = $('stroke-feedback');
    el.textContent = message;
    el.classList.remove('is-wrong', 'is-correct');
    if (type) el.classList.add(type);
  }

  function currentCharacters() {
    const word = typeof currentWord === 'function' ? currentWord() : null;
    return Array.from((word && word.character) || '').filter(ch => /\p{Script=Han}/u.test(ch));
  }

  function showError(message) {
    $('stroke-check-error').hidden = false;
    $('stroke-check-error').textContent = message || 'Stroke checking could not load. Check your internet connection and try again. Your regular writing canvas still works.';
  }

  function start() {
    chars = currentCharacters();
    charIndex = 0;
    $('stroke-check-error').hidden = true;
    $('stroke-check-workspace').hidden = false;
    $('restart-stroke-check').hidden = false;
    $('next-stroke-char').hidden = true;
    if (!chars.length) {
      showError('No Chinese characters were found for this vocabulary item.');
      return;
    }
    loadCharacter();
  }

  function loadCharacter() {
    if (!window.HanziWriter) {
      showError('The stroke-check engine could not load. Connect to the internet, refresh the page, and try again.');
      return;
    }
    const target = $('stroke-check-target');
    target.innerHTML = '';
    $('stroke-check-error').hidden = true;
    $('stroke-check-progress').textContent = `Character ${charIndex + 1} of ${chars.length}: ${chars[charIndex]}`;
    feedback('Loading stroke data…');
    try {
      writer = HanziWriter.create(target, chars[charIndex], {
        width: 280,
        height: 280,
        padding: 16,
        showCharacter: false,
        showOutline: true,
        showHintAfterMisses: 1,
        highlightOnComplete: true,
        drawingWidth: 22,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 250,
        onLoadCharDataSuccess: () => {
          feedback('Ready! Draw each stroke in the correct order.');
          writer.quiz({
            onMistake: (strokeData) => {
              feedback('That stroke is not quite right. Check its direction and shape, then try again!', 'is-wrong');
            },
            onCorrectStroke: (strokeData) => {
              feedback('Correct stroke! Keep going.', 'is-correct');
            },
            onComplete: (summaryData) => {
              feedback('Excellent! You completed the character with the correct strokes. 🎉', 'is-correct');
              if (charIndex < chars.length - 1) {
                $('next-stroke-char').hidden = false;
                $('next-stroke-char').textContent = `Next character (${chars[charIndex + 2]}) →`;
              } else {
                $('next-stroke-char').hidden = true;
              }
            }
          });
        },
        onLoadCharDataError: () => showError(`Stroke data for “${chars[charIndex]}” could not be loaded. Try again later or continue with the freehand canvas.`)
      });
      active = true;
    } catch (err) {
      showError('Unable to start stroke checking for this character. Please refresh and try again.');
    }
  }

  function bind() {
    $('start-stroke-check').addEventListener('click', start);
    $('restart-stroke-check').addEventListener('click', loadCharacter);
    $('next-stroke-char').addEventListener('click', () => {
      if (charIndex < chars.length - 1) {
        charIndex += 1;
        loadCharacter();
      }
    });
    document.addEventListener('hskwordchange', () => {
      if (active) {
        $('stroke-check-workspace').hidden = true;
        $('restart-stroke-check').hidden = true;
        $('next-stroke-char').hidden = true;
        $('stroke-check-error').hidden = true;
        active = false;
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
  return { start };
})();
