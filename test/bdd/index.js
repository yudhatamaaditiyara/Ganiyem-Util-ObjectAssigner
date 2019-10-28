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

/**
 */
let createTarget = () => ({});
let createSource = () => ({
	field: 1,
	method(){
		return 'method';
	},
	get getterMethod(){
		return 'getterMethod';
	},
	set setterMethod(val){
		this.setterValue = val;
	},
	get accessMethod(){
		return 'accessMethod';
	},
	set accessMethod(val){
		this.accessValue = val;
	}
});

/**
 */
describe('index', () => {
	/**
	 */
	it('new ObjectAssigner(target, source)', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		assert.strictEqual(object.target, target);
		assert.strictEqual(object.source, source);
	});

	/**
	 */
	it('ObjectAssigner.create(target, source)', () => {
		let target = createTarget();
		let source = createSource();
		let object = ObjectAssigner.create(target, source);
		assert.strictEqual(object.target, target);
		assert.strictEqual(object.source, source);
	});

	/**
	 */
	it('ObjectAssigner.create() ...catch(e)', () => {
		try {
			ObjectAssigner.create();
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectAssigner.create({});
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectAssigner.create(null, {});
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectAssigner.create(null, null);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('value("field|method")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.value('field') instanceof ObjectAssigner);
		assert.ok(object.value('method') instanceof ObjectAssigner);

		let targetFieldDescriptor = Object.getOwnPropertyDescriptor(target, 'field');
		let sourceFieldDescriptor = Object.getOwnPropertyDescriptor(source, 'field');

		assert.strictEqual(target.field, 1);
		assert.strictEqual(targetFieldDescriptor.get, void 0);
		assert.strictEqual(targetFieldDescriptor.set, void 0);
		assert.strictEqual(targetFieldDescriptor.value, sourceFieldDescriptor.value);
		assert.strictEqual(targetFieldDescriptor.configurable, sourceFieldDescriptor.configurable);
		assert.strictEqual(targetFieldDescriptor.enumerable, sourceFieldDescriptor.enumerable);
		assert.strictEqual(targetFieldDescriptor.writable, sourceFieldDescriptor.writable);

		let targetMethodDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
		let sourceMethodDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.method, 'function');
		assert.strictEqual(targetMethodDescriptor.get, void 0);
		assert.strictEqual(targetMethodDescriptor.set, void 0);
		assert.strictEqual(targetMethodDescriptor.value, sourceMethodDescriptor.value);
		assert.strictEqual(targetMethodDescriptor.configurable, sourceMethodDescriptor.configurable);
		assert.strictEqual(targetMethodDescriptor.enumerable, sourceMethodDescriptor.enumerable);
		assert.strictEqual(targetMethodDescriptor.writable, sourceMethodDescriptor.writable);
	});

	/**
	 */
	it('value("field|method", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		let fieldDescriptor = {value: false, configurable: false, enumerable:false, writable:false};
		let methodDescriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.value('field', fieldDescriptor) instanceof ObjectAssigner);
		assert.ok(object.value('method', methodDescriptor) instanceof ObjectAssigner);

		let targetFieldDescriptor = Object.getOwnPropertyDescriptor(target, 'field');
		let sourceFieldDescriptor = Object.getOwnPropertyDescriptor(source, 'field');

		assert.strictEqual(target.field, 1);
		assert.strictEqual(targetFieldDescriptor.get, void 0);
		assert.strictEqual(targetFieldDescriptor.set, void 0);
		assert.strictEqual(targetFieldDescriptor.value, sourceFieldDescriptor.value);
		assert.strictEqual(targetFieldDescriptor.configurable, fieldDescriptor.configurable);
		assert.strictEqual(targetFieldDescriptor.enumerable, fieldDescriptor.enumerable);
		assert.strictEqual(targetFieldDescriptor.writable, fieldDescriptor.writable);

		let targetMethodDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
		let sourceMethodDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.method, 'function');
		assert.strictEqual(targetMethodDescriptor.get, void 0);
		assert.strictEqual(targetMethodDescriptor.set, void 0);
		assert.strictEqual(targetMethodDescriptor.value, sourceMethodDescriptor.value);
		assert.strictEqual(targetMethodDescriptor.configurable, methodDescriptor.configurable);
		assert.strictEqual(targetMethodDescriptor.enumerable, methodDescriptor.enumerable);
		assert.strictEqual(targetMethodDescriptor.writable, methodDescriptor.writable);
	});

	/**
	 */
	it('valueAs("field|method", "fieldAs|methodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.valueAs('field','fieldAs') instanceof ObjectAssigner);
		assert.ok(object.valueAs('method','methodAs') instanceof ObjectAssigner);

		let targetFieldDescriptor = Object.getOwnPropertyDescriptor(target, 'fieldAs');
		let sourceFieldDescriptor = Object.getOwnPropertyDescriptor(source, 'field');

		assert.strictEqual(target.field, void 0);
		assert.strictEqual(target.fieldAs, 1);
		assert.strictEqual(targetFieldDescriptor.get, void 0);
		assert.strictEqual(targetFieldDescriptor.set, void 0);
		assert.strictEqual(targetFieldDescriptor.value, sourceFieldDescriptor.value);
		assert.strictEqual(targetFieldDescriptor.configurable, sourceFieldDescriptor.configurable);
		assert.strictEqual(targetFieldDescriptor.enumerable, sourceFieldDescriptor.enumerable);
		assert.strictEqual(targetFieldDescriptor.writable, sourceFieldDescriptor.writable);

		let targetMethodDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceMethodDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(target.method, void 0);
		assert.strictEqual(typeof target.methodAs, 'function');
		assert.strictEqual(targetMethodDescriptor.get, void 0);
		assert.strictEqual(targetMethodDescriptor.set, void 0);
		assert.strictEqual(targetMethodDescriptor.value, sourceMethodDescriptor.value);
		assert.strictEqual(targetMethodDescriptor.configurable, sourceMethodDescriptor.configurable);
		assert.strictEqual(targetMethodDescriptor.enumerable, sourceMethodDescriptor.enumerable);
		assert.strictEqual(targetMethodDescriptor.writable, sourceMethodDescriptor.writable);
	});
	
	/**
	 */
	it('valueAs("field|method", "fieldAs|methodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		let fieldDescriptor = {value: false, configurable: false, enumerable:false, writable:false};
		let methodDescriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.valueAs('field', 'fieldAs', fieldDescriptor) instanceof ObjectAssigner);
		assert.ok(object.valueAs('method', 'methodAs', methodDescriptor) instanceof ObjectAssigner);

		let targetFieldDescriptor = Object.getOwnPropertyDescriptor(target, 'fieldAs');
		let sourceFieldDescriptor = Object.getOwnPropertyDescriptor(source, 'field');

		assert.strictEqual(target.field, void 0);
		assert.strictEqual(target.fieldAs, 1);
		assert.strictEqual(targetFieldDescriptor.get, void 0);
		assert.strictEqual(targetFieldDescriptor.set, void 0);
		assert.strictEqual(targetFieldDescriptor.value, sourceFieldDescriptor.value);
		assert.strictEqual(targetFieldDescriptor.configurable, fieldDescriptor.configurable);
		assert.strictEqual(targetFieldDescriptor.enumerable, fieldDescriptor.enumerable);
		assert.strictEqual(targetFieldDescriptor.writable, fieldDescriptor.writable);

		let targetMethodDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceMethodDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(target.method, void 0);
		assert.strictEqual(typeof target.methodAs, 'function');
		assert.strictEqual(targetMethodDescriptor.get, void 0);
		assert.strictEqual(targetMethodDescriptor.set, void 0);
		assert.strictEqual(targetMethodDescriptor.value, sourceMethodDescriptor.value);
		assert.strictEqual(targetMethodDescriptor.configurable, methodDescriptor.configurable);
		assert.strictEqual(targetMethodDescriptor.enumerable, methodDescriptor.enumerable);
		assert.strictEqual(targetMethodDescriptor.writable, methodDescriptor.writable);
	});

	/**
	 */
	it('value("invalidSourcePropertyName") ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('invalidSourcePropertyName');
		let object = new ObjectAssigner(target, source);
		try {
			object.value('invalidSourcePropertyName');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.value(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('method("method")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.method('method') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.method, 'function');
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('method("method", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.method('method', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.method, 'function');
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('methodAs("method", "methodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.methodAs('method', 'methodAs') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.methodAs, 'function');
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('methodAs("method", "methodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.methodAs('method', 'methodAs', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(typeof target.methodAs, 'function');
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('method("invalidSourcePropertyNameMethod") ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('invalidSourcePropertyNameMethod');
		let object = new ObjectAssigner(target, source);
		try {
			object.method('invalidSourcePropertyNameMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('getter("getterMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.getter('getterMethod') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(target.getterMethod, 'getterMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('getter("getterMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.getter('getterMethod', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(target.getterMethod, 'getterMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, descriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('getterAs("getterMethod", "getterMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.getterAs('getterMethod', 'getterMethodAs') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(target.getterMethodAs, 'getterMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('getterAs("getterMethod", "getterMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.getterAs('getterMethod', 'getterMethodAs', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(target.getterMethodAs, 'getterMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, descriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('getter("invalidSourcePropertyNameGetterMethod") ...catch(e)', () => {
		let target = createTarget();
		let source = {
			set notGetterMethod(val){}
		};
		let symbol = Symbol('invalidSourcePropertyNameGetterMethod');
		let object = new ObjectAssigner(target, source);
		try {
			object.getter('invalidSourcePropertyNameGetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter('notGetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('setter("setterMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.setter('setterMethod') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		target.setterMethod = true;
		assert.strictEqual(target.setterValue, true);
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('setter("setterMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.setter('setterMethod', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		target.setterMethod = true;
		assert.strictEqual(target.setterValue, true);
		assert.strictEqual(targetDescriptor.get, descriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('setterAs("setterMethod", "setterMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.setterAs('setterMethod', 'setterMethodAs') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		target.setterMethodAs = true;
		assert.strictEqual(target.setterValue, true);
		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('setterAs("setterMethod", "setterMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.setterAs('setterMethod', 'setterMethodAs', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		target.setterMethodAs = true;
		assert.strictEqual(target.setterValue, true);
		assert.strictEqual(targetDescriptor.get, descriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('setter("invalidSourcePropertyNameSetterMethod") ...catch(e)', () => {
		let target = createTarget();
		let source = {
			get notSetterMethod(){}
		};
		let symbol = Symbol('invalidSourcePropertyNameAccessMethod');
		let object = new ObjectAssigner(target, source);
		try {
			object.setter('invalidSourcePropertyNameSetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter('notSetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('access("accessMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.access('accessMethod') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		target.accessMethod = true;
		assert.strictEqual(target.accessValue, true);
		assert.strictEqual(target.accessMethod, 'accessMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('access("accessMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.access('accessMethod', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		target.accessMethod = true;
		assert.strictEqual(target.accessValue, true);
		assert.strictEqual(target.accessMethod, 'accessMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('accessAs("accessMethod", "accessMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);

		assert.ok(object.accessAs('accessMethod', 'accessMethodAs') instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		target.accessMethodAs = true;
		assert.strictEqual(target.accessValue, true);
		assert.strictEqual(target.accessMethodAs, 'accessMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);
	});

	/**
	 */
	it('accessAs("accessMethod", "accessMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectAssigner(target, source);
		let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.accessAs('accessMethod', 'accessMethodAs', descriptor) instanceof ObjectAssigner);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		target.accessMethodAs = true;
		assert.strictEqual(target.accessValue, true);
		assert.strictEqual(target.accessMethodAs, 'accessMethod');
		assert.strictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(targetDescriptor.set, sourceDescriptor.set);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);
	});

	/**
	 */
	it('access("invalidSourcePropertyNameAccessMethod") ...catch(e)', () => {
		let target = createTarget();
		let source = {
			get notSetterMethod(){},
			set notGetterMethod(val){}
		};
		let symbol = Symbol('invalidSourcePropertyNameAccessMethod');
		let object = new ObjectAssigner(target, source);
		try {
			object.access('invalidSourcePropertyNameAccessMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('notGetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('notSetterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});
});