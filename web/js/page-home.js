import DM from "/js/dm.js";

let menuItems = [
	{ id:1, title:'About', url:'/about', desc:'About this app and the project.'},
	{ id:2, title:'Scopes', url:'/scopes', desc:'A list of available scopes to work with.'},
]

let manager = {
	dataCol: null,
    initialize() {
        console.log('test - Initialize')

		let self = this;
		this.dataCol = DM.Collection(menuItems, "id");

		this.dataCol.subscribe('update', (data) => {
			console.log("data updated")
			self.render();
		})

		this.render()
    },
    render() {
		console.log('test - Render')
		document.getElementById("tel").innerHTML = "";
		let cnt = DM.Target("#tel");

		this.dataCol.forEach(itm => {
			let link = cnt.append('a')
			.class('card-a', true)
			.attr("href", itm.url);
			
			let crd = link.append('display-card')
			.attr('card-title', itm.title)
			.attr('card-desc', itm.desc);
			// let crd = link.append('div').class('card', true);
			// crd.append('div').class('card-bg',true);
			// crd.append('div').class('card-title',true).text(itm.title);
			// crd.append('div').class('card-desc',true).text(itm.desc);
		});

    },

	loadExplorations(expanseId){
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
	
	},
	
	loadExplorationDetail(explorationId){
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
	
	},

}


document.addEventListener('DOMContentLoaded', event => {
	
	document.querySelector("#sortExp").addEventListener('click', function (e) { 
		sortList();
	}, false);


	// var expList = document.querySelector("#tel");
	// expList.addEventListener('selected', function (e) { 
	// 	var container = document.querySelector('#page');
	// 	var explList = container.querySelector('#kepl');
	
	// 	if (explList) {
	// 		explList.setAttribute('expanse-id', e.detail._id);
	// 		explList.setAttribute('mode', "R");
	// 	} else {
	// 		loadExplorations(e.detail._id);
	// 	}
	// }, false);
	
	// expList.addEventListener('deselected', function (e) { 
	// 	var container = document.querySelector('#page');
	// 	var explList = container.querySelector('#kepl');
	// 	if (explList) {
	// 		if (explList) container.removeChild(explList);
	// 	}
	// }, false);

	manager.initialize();

})


const sortList = () => { console.log("cliiiik", "SORTED!") };





