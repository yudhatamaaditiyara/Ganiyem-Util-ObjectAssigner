/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const ObjectAssigner = require('../../');
const helper = require('../helper');

describe('ObjectAssigner#methodAs', () => {
  it('must be work called with ("method", "methodAs")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectAssigner(target, source);

    assert.ok(object.methodAs('method', 'methodAs') instanceof ObjectAssigner);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

    assert.ok(typeof target.methodAs === 'function');
    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
  });

  it('must be work called with ("method", "methodAs", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectAssigner(target, source);
    let descriptor = {value: false, configurable: false, enumerable: false, writable: false};

    assert.ok(object.methodAs('method', 'methodAs', descriptor) instanceof ObjectAssigner);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

    assert.ok(typeof target.methodAs === 'function');
    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);
  });
});