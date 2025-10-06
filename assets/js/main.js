// assets/js/main.js

import { initRouter } from './router.js';

// 각 기능 모듈이 존재한다면 그냥 임포트만 해두면 됩니다.
// 모듈 내부에서 DOM 존재 여부 체크 후 init 하도록 구성해두세요.
import './auth.js';
import './calendar.js';
import './employees.js';
import './work.js';
import './board.js';
import './accidents.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
