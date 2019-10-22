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
'use strict';

/**
 */
class ObjectAssigner
{
	/**
	 * @param {Object} target
	 * @param {Object} source
	 */
	constructor(target, source){
		this.target = target;
		this.source = source;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	value(name, descriptor){
		return this.valueAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	valueAs(name, as, descriptor){
		const sourceDescriptor = Object.getOwnPropertyDescriptor(this.source, name);
		const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
		const targetDescriptor = Object.assign(objectDescriptor, Object(descriptor), {value: sourceDescriptor.value});
		Object.defineProperty(this.target, as, targetDescriptor);
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	getter(name, descriptor){
		return this.getterAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	getterAs(name, as, descriptor){
		const sourceDescriptor = Object.getOwnPropertyDescriptor(this.source, name);
		const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
		const targetDescriptor = Object.assign(objectDescriptor, Object(descriptor), {get: sourceDescriptor.get});
		Object.defineProperty(this.target, as, targetDescriptor);
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	setter(name, descriptor){
		return this.setterAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	setterAs(name, as, descriptor){
		const sourceDescriptor = Object.getOwnPropertyDescriptor(this.source, name);
		const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
		const targetDescriptor = Object.assign(objectDescriptor, Object(descriptor), {set: sourceDescriptor.set});
		Object.defineProperty(this.target, as, targetDescriptor);
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	access(name, descriptor){
		return this.accessAs(name, name);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectAssigner}
	 */
	accessAs(name, as, descriptor){
		const sourceDescriptor = Object.getOwnPropertyDescriptor(this.source, name);
		const objectDescriptor = {configurable: sourceDescriptor.configurable, enumerable: sourceDescriptor.enumerable, writable: sourceDescriptor.writable};
		const targetDescriptor = Object.assign(objectDescriptor, Object(descriptor), {get: sourceDescriptor.get, set: sourceDescriptor.set});
		Object.defineProperty(this.target, as, targetDescriptor);
		return this;
	}

	/**
	 * @param {Object} target
	 * @param {Object} source
	 */
	static create(target, source){
		return new this(target, source);
	}
}

/**
 * @+
 */
module.exports = ObjectAssigner;