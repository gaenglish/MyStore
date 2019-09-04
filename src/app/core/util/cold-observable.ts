import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, switchMap, tap, finalize, filter, share, startWith } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

// https://medium.com/@m3po22/stop-using-ngrx-effects-for-that-a6ccfe186399

/**
 * An Observable that performs an apiCall and action when a triggerCondition is met by an observableTrigger$ emission. Returns an Observable data$.
 * @param observableTrigger$ - The Observable that may emit a value that matches the triggerCondition
 * @param triggerCondition - A function that returns true if the passed parameter meets a defined condition. Causes apiCall and action to be performed.
 * @param data$ - The returned Observable that can be subscribed to.
 * @param apiCall$ - A function that performs an API call and returns an Observable<Response | HttpResponse<object>>
 * @param action - A function that consumes the API call response
 * @param onUnsubscribe - An optional function that is performed after all subscriptions to this function have been terminated
 */
export function coldObservable<T, U>(
  observableTrigger$: Observable<T>,
  triggerCondition: (data: any) => boolean,
  data$: Observable<U>,
  apiCall$: (data?: any) => Observable<Response | HttpResponse<object>>,
  action: (data: Response | HttpResponse<object>) => void,
  onUnsubscribe: () => void = () => {}
) {
  return muteFirst(
    requireData(
      observableTrigger$,
      triggerCondition,
      apiCall$,
      action,
      onUnsubscribe
    ).pipe(startWith(null)),
    data$
  );
}

export function coldObservablePersist<T>(
  data$: Observable<T>,
  apiCall$: (data?: any) => Observable<Response | HttpResponse<object>>,
  action: (data: Response | HttpResponse<object>) => void,
  onUnsubscribe: () => void = () => {}
) {
  return coldObservable<T, T>(
    data$,
    t => {
      console.log(t);
      return !t;
    },
    data$,
    apiCall$,
    action,
    onUnsubscribe
  );
}

function requireData<T>(
  trigger$: Observable<T>,
  triggerCondition: (data: any) => boolean,
  apiCall: (data?: any) => Observable<Response | HttpResponse<object>>,
  action: (data: Response | HttpResponse<object>) => void,
  final: () => void
) {
  return trigger$.pipe(
    filter(triggerCondition),
    switchMap(data => apiCall(data)),
    tap(data => action(data)),
    finalize(() => final()),
    share()
  );
}

// Modified from https://gist.github.com/mfp22/be6f34dacf66c06eca4daa32039e914e
function muteFirst<T, R>(first$: Observable<T>, second$: Observable<R>) {
  return combineLatest(first$, second$).pipe(
    map(([a, b]) => b),
    distinctUntilChanged()
  );
}
