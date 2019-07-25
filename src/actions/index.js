export const AUTHORIZE = 'AUTHORIZE';
export const UNAUTHORIZE = 'UNAUTHORIZE';

export function authorize() {
  return { 
    type: AUTHORIZE,
    payload: true
  }
}

export function unauthorize() {
  return { 
    type: UNAUTHORIZE,
    payload: false
  }
}