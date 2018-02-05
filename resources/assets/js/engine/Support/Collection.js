var ns = namespace('Engine.Support');

import Arr from 'Engine/Support/Arr.js';

export default class Collection {

	/**
	 * Creates a new collection.
	 *
	 * @param  {array|object}  items
	 *
	 * @return {this}
	 */
	constructor(items = {}) {

		/**
		 * The items contained in the collection.
		 *
		 * @var {array|object}  items
		 */
		this._items = this._getArrayableItems(items);

	};

	/**
	 * Creates a new collection instance.
	 *
	 * @param  {array|object}  items
	 *
	 * @return {Engine.Support.Collection}
	 */
	static make(items = {}) {
		return new Collection(items);
	};

	static wrap(value) {
		throw new Error('Not yet implemented');
	};

	static unwrap(value) {
		throw new Error('Not yet implemented');
	};

	static times(number, callback = null) {
		throw new Error('Not yet implemented');
	};

	/**
	 * Returns all of the items in the collection.
	 *
	 * @return {array|object}
	 */
	all() {
		return this._items;
	};

	avg(callback = null) {
		throw new Error('Not yet implemented');
	};

	/**
	 * Alias of {@see this.avg()}.
	 *
	 * @return {mixed}
	 */
	average(callback = null) {
		return this.avg(callback);
	};

	median(key = null) {
		throw new Error('Not yet implemented');
	};

	mode(key = null) {
		throw new Error('Not yet implemented');
	};

	/**
	 * Collapses the collection of items into a single array.
	 *
	 * @return {static}
	 */
	collapse() {

		// Make sure the items are an array
		if(!this.isArray()) {
			throw new Error('Cannot collapse non-array items.')
		}

		// Collapse the collection
		return new Collection(Arr.collapse(this._items));

	};

	contains() {
		throw new Error('Not yet implemented');
	};

	containsStrict() {
		throw new Error('Not yet implemented');
	};

	crossJoin() {
		throw new Error('Not yet implemented');
	};

	diff() {
		throw new Error('Not yet implemented');
	};

	diffAssoc() {
		throw new Error('Not yet implemented');
	};

	diffKeys() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Executes the specified callback over each item.
	 *
	 * @param  {function}  callback
	 *
	 * @return {this}
	 */
	each(callback) {

		// Iterate through the items
		for(let key in this._items) {

			// Exclude non-property keys
			if(typeof this._items === 'object' && !this._items.hasOwnProperty(key)) {
				continue;
			}

			// Execute the callback
			if(callback(this._items[key], key) === false) {
				break;
			}

		}

		// Allow chaining
		return this;

	};

	eachSpread() {
		throw new Error('Not yet implemented');
	};

	every() {
		throw new Error('Not yet implemented');
	};

	except() {
		throw new Error('Not yet implemented');
	};

	filter() {
		throw new Error('Not yet implemented');
	};

	when() {
		throw new Error('Not yet implemented');
	};

	unless() {
		throw new Error('Not yet implemented');
	};

	where() {
		throw new Error('Not yet implemented');
	};

	_operatorForWhere() {
		throw new Error('Not yet implemented');
	};

	whereStrict() {
		throw new Error('Not yet implemented');
	};

	whereIn() {
		throw new Error('Not yet implemented');
	};

	whereInStrict() {
		throw new Error('Not yet implemented');
	};

	whereNotIn() {
		throw new Error('Not yet implemented');
	};

	whereNotInStrict() {
		throw new Error('Not yet implemented');
	};

	first() {
		throw new Error('Not yet implemented');
	};

	firstWhere() {
		throw new Error('Not yet implemented');
	};

	flatten() {
		throw new Error('Not yet implemented');
	};

	flip() {
		throw new Error('Not yet implemented');
	};

	forget() {
		throw new Error('Not yet implemented');
	};

	get() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Sets the value for the specified key.
	 *
	 * @param  {mixed}  key
	 * @param  {mixed}  value
	 *
	 * @return {void}
	 */
	set(key, value) {
		this.offsetSet(key, value);
	};

	groupBy() {
		throw new Error('Not yet implemented');
	};

	keyBy() {
		throw new Error('Not yet implemented');
	};

	has() {
		throw new Error('Not yet implemented');
	};

	implode() {
		throw new Error('Not yet implemented');
	};

	intersect() {
		throw new Error('Not yet implemented');
	};

	intersectByKeys() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Returns whether or not the collection is empty.
	 *
	 * @return {boolean}
	 */
	isEmpty() {
		return this._items.length === 0;
	};

	/**
	 * Returns whether or not the collection is not empty.
	 *
	 * @return {boolean}
	 */
	isNotEmpty() {
		return !this.isEmpty();
	};

	/**
	 * Returns whether or not the given value is callable, but not a string.
	 *
	 * @param  {mixed}  value
	 *
	 * @return {boolean}
	 */
	_useAsCallable(value) {
		return typeof value === 'function';
	};

	keys() {
		throw new Error('Not yet implemented');
	};

	last() {
		throw new Error('Not yet implemented');
	};

	pluck() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Runs the specifiec map over each of the items.
	 *
	 * @param  {function}  callback
	 *
	 * @return {static}
	 */
	map(callback) {

		// Check for array items
		if(this.isArray()) {
			return new Collection(this._items.map(callback));
		}

		// Clone the items
		var items = Object.assign({}, this._items);

		// Iterate through the items as an object
		for(let key in items) {

			// Skip non-properties of the object
			if(!items.hasOwnProperty(key)) {
				continue;
			}

			// Determine the value
			let value = items[key];

			// Update the value using the callback
			items[key] = callback.call(null, value, key, items);

		}

		// Return a new collection of items
		return new Collection(items);

	};

	mapSpread() {
		throw new Error('Not yet implemented');
	};

	mapToDictionary() {
		throw new Error('Not yet implemented');
	};

	mapToGroups() {
		throw new Error('Not yet implemented');
	};

	mapWithKeys() {
		throw new Error('Not yet implemented');
	};

	flatMap() {
		throw new Error('Not yet implemented');
	};

	mapInto() {
		throw new Error('Not yet implemented');
	};

	max() {
		throw new Error('Not yet implemented');
	};

	marge() {
		throw new Error('Not yet implemented');
	};

	combine() {
		throw new Error('Not yet implemented');
	};

	union() {
		throw new Error('Not yet implemented');
	};

	min() {
		throw new Error('Not yet implemented');
	};

	nth() {
		throw new Error('Not yet implemented');
	};

	only() {
		throw new Error('Not yet implemented');
	};

	forPage() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Partitions the collection into two arrays using the given callback or key.
	 *
	 * @param  {function|string}  callback
	 *
	 * @return {static}
	 */
	partition(callback) {

		// Initialize the partitions
		var partitions = [new Collection, new Collection];

		// Normalize the callback
		callback = this._valueRetriever(callback);

		// Iterate through the items
		this.each(function(item, key) {
			partitions[+!callback(item, key)].set(key, item);
		});

		// Return a new collection
		return new Collection(partitions);

	};

	pipe() {
		throw new Error('Not yet implemented');
	};

	pop() {
		throw new Error('Not yet implemented');
	};

	prepend() {
		throw new Error('Not yet implemented');
	};

	push() {
		throw new Error('Not yet implemented');
	};

	concat() {
		throw new Error('Not yet implemented');
	};

	pull() {
		throw new Error('Not yet implemented');
	};

	put() {
		throw new Error('Not yet implemented');
	};

	random() {
		throw new Error('Not yet implemented');
	};

	reduce() {
		throw new Error('Not yet implemented');
	};

	reject() {
		throw new Error('Not yet implemented');
	};

	reverse() {
		throw new Error('Not yet implemented');
	};

	search() {
		throw new Error('Not yet implemented');
	};

	shift() {
		throw new Error('Not yet implemented');
	};

	shuffle() {
		throw new Error('Not yet implemented');
	};

	slice() {
		throw new Error('Not yet implemented');
	};

	split() {
		throw new Error('Not yet implemented');
	};

	chunk() {
		throw new Error('Not yet implemented');
	};

	sort() {
		throw new Error('Not yet implemented');
	};

	sortBy() {
		throw new Error('Not yet implemented');
	};

	sortByDesc() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Splices a portion of the underlying collection array.
	 *
	 * @param  {integer}       offset
	 * @param  {integer|null}  length
	 * @param  {mixed}         replacement
	 *
	 * @return {static}
	 *
	 * @throws {Error}
	 */
	splice(offset, length = null, replacement = []) {

		// Make sure items are an array
		if(!this.isArray()) {
			throw new Error('Cannot splice non-array items.');
		}

		// Check for null length and empty replacement
		if(length === null && replacement.length === 0) {
			return new Collection(this._items.splice(offset));
		}

		// Splice the array using length and replacement
		return new Collection(this._items.splice(offset, length, ...replacement));

	};

	sum() {
		throw new Error('Not yet implemented');
	};

	take() {
		throw new Error('Not yet implemented');
	};

	tap() {
		throw new Error('Not yet implemented');
	};

	transform() {
		throw new Error('Not yet implemented');
	};

	unique() {
		throw new Error('Not yet implemented');
	};

	uniqueStrict() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Returns the values of the collection of items.
	 *
	 * @return {array}
	 */
	values() {
		return new Collection(Arr.values(this._items));
	};

	/**
	 * Returns a value retrieving callback.
	 *
	 * @param  {string|function}  value
	 *
	 * @return {function}
	 */
	_valueRetriever(value) {

		// Check if the value can be used as a callback
		if(this._useAsCallable(value)) {
			return value;
		}

		// Use the value as a key on the data set
		return function(item) {
			return data_get(item, value);
		}

	};

	zip() {
		throw new Error('Not yet implemented');
	};

	pad() {
		throw new Error('Not yet implemented');
	};

	/**
	 * Returns whether or not items are a plain array.
	 *
	 * @return {boolean}
	 */
	isArray() {
		return Array.isArray(this._items);
	};

	/**
	 * Alias of {@see this.isArray()}.
	 *
	 * @return {boolean}
	 */
	isSequential() {
		return this.isArray();
	};

	/**
	 * Returns whether or not items are a plain object.
	 *
	 * @return {boolean}
	 */
	isObject() {
		return typeof this._items === 'object'
	};

	/**
	 * Alias of {@see this.isObject()}.
	 *
	 * @return {boolean}
	 */
	isAssociative() {
		return this.isObject();
	};

	/**
	 * Returns the collection of items as a plain array.
	 *
	 * @return {array}
	 */
	toArray() {

		// Convert each array-like item to an array
		return this.map(function(value) {

			// Check for arrayable object
			if(typeof value === 'object' && typeof value.toArray === 'function') {

				// Cast object to array
				return value.toArray();

			}

			// Return value as-is
			return value;

		});

	};

	/**
	 * Returns the collection of items as JSON.
	 *
	 * @param  {string|null}  replacer
	 * @param  {string|null}  space
	 *
	 * @return {string}
	 */
	toJson(replacer = null, space = null) {
		return JSON.stringify(this._items, replacer, space);
	};

	/**
	 * Returns the number of items in the collection.
	 *
	 * @return {integer}
	 */
	count() {
		return this._items.length;
	};

	/**
	 * Returns whether or not the specified offset exists.
	 *
	 * @param  {mixed}  key
	 *
	 * @return {boolean}
	 */
	offsetExists(key) {
		return typeof this._items[key] !== 'undefined';
	};

	/**
	 * Returns the item at the specified offset.
	 *
	 * @param  {mixed}  key
	 *
	 * @return {mixed}
	 */
	offsetGet(key) {
		return this._items[key];
	};

	/**
	 * Sets the item at the specified offset.
	 *
	 * @param  {mixed}  key
	 * @param  {mixed}  value
	 *
	 * @return {void}
	 */
	offsetSet(key, value) {

		// Check for NULL key
		if(key === null) {

			// Use the count of items in the collection
			key = this._items.length;

		}

		// Set the item at the offset
		this._items[key] = value;

	};

	/**
	 * Removes the item at the given offset.
	 *
	 * @param  {mixed}  
	 */
	offsetUnset(key) {
		delete this._items[key];
	};

	/**
	 * Converts the collection into its string representation.
	 *
	 * @return {string}
	 */
	toString() {
		return this.toJson();
	};

	/**
	 * Converts the specified items to an array or object.
	 *
	 * @param  {mixed}  items
	 *
	 * @return {array|object}
	 */
	_getArrayableItems(items) {

		// Check for an Array
		if(Array.isArray(items)) {
			return items;
		}

		// Check for Collection
		else if(items instanceof Collection) {
			return items;
		}

		// Cast to Object
		return Object.assign({}, items);

	};
}

ns.Collection = Collection;