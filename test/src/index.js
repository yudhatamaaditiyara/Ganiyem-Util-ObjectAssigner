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
const {IllegalArgumentError} = require('ganiyem-error');
const ObjectAssigner = require('../../');
const helper = require('../helper');

describe('ObjectAssigner', () => {
  it('must be work new ObjectAssigner(target, source)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectAssigner(target, source);
    assert.strictEqual(object.target, target);
    assert.strictEqual(object.source, source);
  });

  it('must be throw IllegalArgumentError() new ObjectAssigner()', () => {
    try {
      new ObjectAssigner();
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() new ObjectAssigner({})', () => {
    try {
      new ObjectAssigner({});
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() new ObjectAssigner(null, {})', () => {
    try {
      new ObjectAssigner(null, {});
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be work ObjectAssigner.create(target, source)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = ObjectAssigner.create(target, source);
    assert.strictEqual(object.target, target);
    assert.strictEqual(object.source, source);
  });

  it('must be throw IllegalArgumentError() ObjectAssigner.create()', () => {
    try {
      ObjectAssigner.create();
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() ObjectAssigner.create({})', () => {
    try {
        ObjectAssigner.create({});
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() ObjectAssigner.create(null, {})', () => {
    try {
      ObjectAssigner.create(null, {});
      assert.ok(false);
    } catch (e) {
        assert.ok(e instanceof IllegalArgumentError);
    }
  });
});