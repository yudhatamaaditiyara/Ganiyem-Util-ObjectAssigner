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

describe('ObjectAssigner#accessAs', () => {
  it('must be work called with ("access", "accessAs")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectAssigner(target, source);

    assert.ok(object.accessAs('access', 'accessAs') instanceof ObjectAssigner);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    target.accessAs = 'wrap-value';
    assert.strictEqual(target.accessAs, 'access');
    assert.strictEqual(target.accessValue, 'wrap-value');
    assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
    assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
  });

  it('must be work called with ("access", "accessAs", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectAssigner(target, source);
    let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable: false};

    assert.ok(object.accessAs('access', 'accessAs', descriptor) instanceof ObjectAssigner);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessAs');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    target.accessAs = 'wrap-value';
    assert.strictEqual(target.accessAs, 'access');
    assert.strictEqual(target.accessValue, 'wrap-value');
    assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
    assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
  });
});