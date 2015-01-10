	var logObjectChange = function(change) {
		var res = {
			changeType: change.type
			,itemKey: change.key
			,currentValue: change.object.get(change.key)
			,oldValue: change.oldValue
			,raw: change
		};
		console.log('list', res); // all changes
	};



	var hideElement = function(root, selector) {
		root.querySelector(selector).className += ' hidden';
	};
	var showElement = function(root, selector) {
		var classes = root.querySelector(selector).className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
		root.querySelector(selector).className = classes;
	};
	var addClass = function(root, selector, className) {
		root.querySelector(selector).className += ' ' + className;
	};
	var removeClass = function(root, selector, className) {
		var re = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "gi");

		var classes = root.querySelector(selector).className.replace(re, '' );
		root.querySelector(selector).className = classes;
	};
	var replaceClass = function(root, selector, oldClass, newClass) {
		var re = new RegExp("(?:^|\\s)" + oldClass + "(?!\\S)", "gi");

		var classes = root.querySelector(selector).className.replace(re, '') + ' ' + newClass;
		root.querySelector(selector).className = classes;
	};


	var loadExplorations = function(expanseId){
		var container = document.querySelector('#page');

		var explList = document.createElement('kolab-exploration-list');
		explList.setAttribute('id', "kepl");
		explList.setAttribute('expanse-id', expanseId);
		container.appendChild(explList);

		explList.addEventListener('activated', function (e) { 
			// Hide expanse list
			hideElement(container, '#tel');

			// change explorations to float left
			addClass(container, '#kepl', "flt-lft");
		}, false);

		explList.addEventListener('browse', function (e) { 
			// Remove exploration detail
			var container = document.querySelector('#page');
			var explDetail = container.querySelector('#kepl-detail');
			if (explDetail) {
				if (explDetail) container.removeChild(explDetail);
			}

			// Show expanse list
			showElement(container, '#tel');

			// change explorations to float right
			removeClass(container, '#kepl', "flt-lft");
		}, false);


		explList.addEventListener('selected', function (e) { 
			// load exploration details
			loadExplorationDetail(e.detail._id);
		}, false);
		explList.addEventListener('deselected', function (e) { 
			// load exploration details
			//loadExplorationDetail();
			var container = document.querySelector('#page');
			var explDetail = container.querySelector('#kepl-detail');
			if (explDetail) {
				if (explDetail) container.removeChild(explDetail);
			}
		}, false);

	};

	var loadExplorationDetail = function(explorationId){
		var container = document.querySelector('#page');
		var explDetail = container.querySelector('#kepl-detail');

		if (explDetail) {
			explDetail.setAttribute('exploration-id', explorationId);
			explDetail.setAttribute('tab', "asperations");
		} else {
			explDetail = document.createElement('kolab-exploration-detail');
			explDetail.setAttribute('id', "kepl-detail");
			explDetail.setAttribute('exploration-id', explorationId);
			container.appendChild(explDetail);
		}

	};

	var expList = document.querySelector("#tel");
	expList.addEventListener('selected', function (e) { 
		var container = document.querySelector('#page');
		var explList = container.querySelector('#kepl');

		if (explList) {
			explList.setAttribute('expanse-id', e.detail._id);
			explList.setAttribute('mode', "R");
		} else {
			loadExplorations(e.detail._id);
		}
	}, false);

	expList.addEventListener('deselected', function (e) { 
		var container = document.querySelector('#page');
		var explList = container.querySelector('#kepl');
		if (explList) {
			if (explList) container.removeChild(explList);
		}
	}, false);

