import {
  animation,
  style,
  animate,
  keyframes,
  trigger,
  state,
  transition
} from '@angular/animations';

export const DEFAULT_TIMING = 1;

export const bounceIn = animation(
  animate(
    '{{ timing }}s {{ delay }}s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    keyframes([
      style({ opacity: 0, transform: 'scale3d(.3, .3, .3)', offset: 0 }),
      style({ transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2 }),
      style({ transform: 'scale3d(.9, .9, .9)', offset: 0.4 }),
      style({
        opacity: 1,
        transform: 'scale3d(1.03, 1.03, 1.03)',
        offset: 0.6
      }),
      style({ transform: 'scale3d(.97, .97, .97)', offset: 0.8 }),
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 1 })
    ])
  ),
  { params: { timing: DEFAULT_TIMING, delay: 0 } }
);

export function fadeInX(a, b) {
  return animation(
    animate(
      '{{ timing }}s',
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d({{ a }}, 0, 0)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translate3d({{ a }}, 0, 0)',
          offset: '{{ delay }}'
        }),
        style({
          opacity: 1,
          transform: 'translate3d({{ b }}, 0, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_TIMING, delay: 0, a, b } }
  );
}

export const fadeIn = fadeInX(0, 0);

export function scrollX(a, b) {

  return animation(
    animate('1s',
      keyframes([
        style({
          top: a
        }),
        style({
          top: b
        })
      ])
    )
  );
}


// Modified from: https://github.com/angular/components/blob/master/src/material/snack-bar/snack-bar-animations.ts
export const multiSnackBarShowHide = trigger('state', [
  state('void, hidden', style({
    transform: 'scale(0.8)',
    opacity: 0,
  })),
  state('visible', style({
    transform: 'scale(1)',
    opacity: 1,
  })),
  transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
  transition('* => void, * => hidden', animate('0ms', style({
    opacity: 0
  }))),
]);
