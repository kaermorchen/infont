// Bootstrap QUnit
import 'qunit';
// import 'qunit/qunit/qunit.css';
// import 'qunit-dom/dist/qunit-dom';

QUnit.start();

// const getTestRoot = (): HTMLElement =>
//   document.getElementById('qunit-fixture')!;

// // Setup QUnit.dom
// Object.defineProperty(QUnit.assert.dom, 'rootElement', { get: getTestRoot });

// re-export QUnit modules for convenience
export const module = QUnit.module;
export const test = QUnit.test;
