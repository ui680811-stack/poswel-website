import { initAuth } from './auth.js';
import { initRouter } from './router.js';
import { initCalendar } from './calendar.js';
import { initEmployees } from './employees.js';
import { initWork } from './work.js';
import { initBoard } from './board.js';
import { initAccidents } from './accidents.js';

window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initRouter();
  initCalendar();
  initEmployees();
  initWork();
  initBoard();
  initAccidents();
});
