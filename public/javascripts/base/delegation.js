/*
---
description: Better event delegation for MooTools.
license: MIT-style
authors:
  [Christopher Pitt, Arieh Glazer, James Emerton]
provides:
  [Element.toSelector, Element.delegateEvent, Element.delegateEvents, Element.denyEvent, Element.denyEvents, Element.hoistEvent, Element.hoistEvents, Element.dropEvent, Element.dropEvents]
requires:
  core/1.3: [Element.Event, Selectors]
...
*/

(function() {

	var each = function(collection, fn, context) {
		for (var key in collection) {
			if (collection.hasOwnProperty(key)) {
				fn.apply((context || this), [key, collection[key]]);
			}
		}
		return collection;
	};

	Element.implement({
		'toSelector': function() {
			var selector = [],
				_id = this.get('id'),
				_name = this.get('name'),
				_class = this.get('class');

			if (_id) {
				selector.push('#', _id);
			}
			if (_name) {
				selector.push('[name=', _name, ']');
			}
			if (_class) {
				selector.push('.', _class.replace(' ', '.'));
			}

			return selector.join('');
		},
		'delegateEvent': function(type, delegates, prevent, propagate) {
			var self = this,
				key = 'delegates:' + type,
				stored = this.retrieve(key) || false,

				handler = function(e) {
					var target = document.id(e.target),
						prevent = prevent || true,
						propagate = propagate || false
						stored = self.retrieve(key),
						args = arguments;

					each(stored, function(selector, delegates) {
						if ((selector == 'self' && (target == self || target.getParents().contains(self))) || target.match(selector)) {
							if (selector != 'self') {
								if (prevent) e.preventDefault();
								if (!propagate) e.stopPropagation();
							}
							each(delegates, function(key, fn) {
								fn.apply(target, args);
							});
						}
					}, self);

					return self;
				};

			if (stored) {
				each(delegates, function(selector, fn) {
					(stored[selector]) ? stored[selector].push(fn) : stored[selector] = [fn];
				});
				return self;
			} else {
				stored = {};
				each(delegates, function(selector, fn) {
					stored[selector] = [fn];
				});
				self.store(key, stored);
			}

			if (/focus|blur|change/.test(type)) {
				var wrapper = function(e) {
					e = new Event(e, self.getWindow());
					handler.call(self, e);
				};

				if (Browser.ie) {
					switch (type) {
						case 'focus':
							self.attachEvent('onfocusin', wrapper);
							break;
						case 'blur':
							self.attachEvent('onfocusout', wrapper);
							break;
						case 'change':
							self.attachEvent('change', wrapper);
							break;
					}
				} else {
					self.addEventListener(type, wrapper, true);
				}
			} else {
				self.addEvent(type, handler);
			}
			return self;
		},
		'delegateEvents': function(delegates, prevent, propagate) {
			each(delegates, function(key, delegate) {
				this.delegateEvent(key, delegate, prevent, propagate);
			}, this);
			return this;
		},
		'denyEvent': function(type, selector, fn) {
			var stored = this.retrieve('delegates:' + type) || false;
			stored && stored[selector] && stored[selector].erase(fn);
			return this;
		},
		'denyEvents': function(type, selector) {
			var stored = this.retrieve('delegates:' + type) || false;
			stored && stored[selector] && delete stored[selector];
			return this;
		},
		'hoistEvent': function(parent, type, fn, prevent, propogate) {
			var delegates = {};
			delegates[this.toSelector()] = fn;
			return parent.delegateEvent.apply(parent, [type, delegates, prevent, propogate]);
		},
		'hoistEvents': function(parent, types, prevent, propogate) {
			var delegates = {},
				selector = this.toSelector();

			each(types, function(key, delegate) {
				delegates[key] = {};
				delegates[key][selector] = delegate;
			}, this);

			return parent.delegateEvents.apply(parent, [delegates, prevent, propogate]);
		},
		'dropEvent': function(parent, type, fn) {
			return parent.denyEvent(this.toSelector(), type, fn);
		},
		'dropEvents': function(parent, type) {
			return parent.denyEvents(type, this.toSelector());
		}
	});

})();