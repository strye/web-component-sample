(function(){
	var root = this;
	var Kolab = root.kolab = root.kolab || {};
	var kD = Kolab.data = Kolab.data || {};

	kD.VERSION = '0.0.3';




	var loadDataSet = function(data) {
		var results = new _9d.collection();
		data.forEach(function(row) {
			results.put(row._id, row);
		});
		return results;
	};

	kD.getExpanses = function(){ return loadDataSet(expanses); };
	kD.getExplorations = function(expanseId){ 
		var results = new _9d.collection();
		explorations.forEach(function(row) {
			if (row.expanseId === expanseId) {
				results.put(row._id, row);
			}
		});
		return results;
	};
	kD.getAspirations = function(explorationId){ 
		var results = new _9d.collection();
		aspirations.forEach(function(row) {
			if (row.explorationId === explorationId) {
				results.put(row._id, row);
			}
		});
		return results;
	};
	kD.getActivities = function(explorationId){ 
		var results = new _9d.collection();
		activities.forEach(function(row) {
			if (row.explorationId === explorationId) {
				results.put(row._id, row);
			}
		});
		return results;
	};
	kD.getMomentos = function(explorationId){ 
		var results = new _9d.collection();
		momentos.forEach(function(row) {
			if (row.explorationId === explorationId) {
				results.put(row._id, row);
			}
		});
		return results;
	};
	kD.getInquiries = function(explorationId){ 
		var results = new _9d.collection();
		inquiries.forEach(function(row) {
			if (row.explorationId === explorationId) {
				results.put(row._id, row);
			}
		});
		return results;
	};
	kD.getUsers = function(){ return loadDataSet(users); };



	var expanses = [
		{ "_id" : "50db42348ee191efa1f6732f" , "title" : "Spaces Tracking" , "purpose" : "Space used to track updates"}
		,{ "_id" : "50db42488ee191efa1f67330" , "title" : "Spaces Testing Two" , "purpose" : "Space used to test the system TWO"}
		,{ "_id" : "50db42528ee191efa1f67331" , "title" : "Spaces Testing Three" , "purpose" : "Space used to test the system THREE"}
	];

	var explorations = [
		{ "_id" : "50d8b3173076d1011df8c64a" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "General Items" , "order" : 2 , "level" : 1}
		,{ "_id" : "50d8b3233076d1011df8c64b" , "level" : 2 , "order" : 3 , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "UI and UX"}
		,{ "_id" : "50d8b32d3076d1011df8c64c" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Space" , "order" : 4 , "level" : 1}
		,{ "_id" : "50d8b3383076d1011df8c64d" , "level" : 1 , "order" : 5 , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Agenda"}
		,{ "_id" : "50d8b3423076d1011df8c64e" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Goals" , "order" : 6 , "level" : 1}
		,{ "_id" : "50d8b34c3076d1011df8c64f" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Questions" , "order" : 7 , "level" : 1}
		,{ "_id" : "50d8b3553076d1011df8c650" , "level" : 1 , "order" : 8 , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Actions"}
		,{ "_id" : "50d8b35e3076d1011df8c651" , "level" : 1 , "order" : 9 , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Notes"}
		,{ "_id" : "50d8b36a3076d1011df8c652" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Chat" , "order" : 10 , "level" : 1}
		,{ "_id" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "title" : "Testing Topic" , "order" : 1 , "level" : 1}
		,{ "expanseId" : "50db42488ee191efa1f67330" , "title" : "Test Topic" , "order" : 1 , "level" : 1 , "_id" : "50de366b023f581505000002"}
		,{ "expanseId" : "50db42528ee191efa1f67331" , "title" : "Space three test topic" , "order" : 1 , "level" : 1 , "_id" : "50de368b023f581505000004"}	
	];


	var aspirations = [
		{ "_id" : "50d781a18c34e1bb49000001" , "met" : false , "target" : "test" , "title" : "Test Goal for Topic One" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d781f48c34e1bb49000003" , "met" : false , "target" : "test" , "title" : "Test Topic One" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d782c68c34e1bb49000005" , "met" : false , "target" : "test" , "title" : "Test Topic One" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50b144c9ba90fc0e1300003f" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "December" , "title" : "Strategy Goal 2" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "_id" : "50d7855bade9d2df54000001" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "Test" , "title" : "Test Topic One" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d78633c1f9f75655000001" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "test" , "title" : "Test for Topic One (2)" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50bedfd43f60a61804000032" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Add ability to tag topic items. (This may replace the target fields on goals and actions.)" , "explorationId" : "50d8b3173076d1011df8c64a"}
		,{ "_id" : "50bee0013f60a61804000034" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Need the ability to filter results by tags." , "explorationId" : "50d8b3173076d1011df8c64a"}
		,{ "_id" : "50bed5283f60a6180400001c" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Add fixed footer in order to allow for navigation even on long pages." , "explorationId" : "50d8b3233076d1011df8c64b"}
		,{ "_id" : "50bede6d3f60a61804000030" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Give a visual indication of the active topic." , "explorationId" : "50d8b3233076d1011df8c64b"}
		,{ "_id" : "50b14034ba90fc0e1300000d" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "april" , "title" : "Strategy Goal 1" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "_id" : "50bedc4c3f60a61804000026" , "met" : true , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Need to compare determine if the object has been modified before sending a save command to the server" , "explorationId" : "50d8b3423076d1011df8c64e"}
		,{ "_id" : "50bedc563f60a61804000028" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Need to compare determine if the object has been modified before sending a save command to the server" , "explorationId" : "50d8b34c3076d1011df8c64f"}
		,{ "_id" : "50bedc5d3f60a6180400002a" , "met" : true , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Need to compare determine if the object has been modified before sending a save command to the server" , "explorationId" : "50d8b3553076d1011df8c650"}
		,{ "_id" : "50b14682ba90fc0e13000055" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "V1" , "title" : "Add a chat window for transitory data." , "explorationId" : "50d8b36a3076d1011df8c652"}
		,{ "_id" : "50bee6bd3f60a61804000038" , "met" : false , "expanseId" : "50db42348ee191efa1f6732f" , "target" : "TEST" , "title" : "Chat Window Two" , "explorationId" : "50d8b36a3076d1011df8c652"}
		,{ "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b2fb3076d1011df8c649" , "title" : "Goal 1.3" , "met" : false , "target" :  null  , "_id" : "51296638849890000000000b"}
		,{ "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b36a3076d1011df8c652" , "title" : "Include the authors name when displaying in the notifications window." , "met" : false , "target" :  null  , "_id" : "5129680b849890000000001e"}
	];


	var activities = [
		{ "_id" : "50ad48378a798fef3f000001" , "agendaId" :  null  , "createDate" : "2012-11-21T21:28:12.888Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "" , "writer" : { "userId" : "" , "userName" : ""}}
		,{ "_id" : "50d8a8a6c1f9f75655000003" , "createDate" : "2012-12-24T19:10:30.381Z" , "modifiedDate" : "2012-12-23T22:31:55.871Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 2 , "targetDate" : "prolatariate" , "title" : "Take up arms and act! 1.2" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d8a9f0c1f9f75655000005" , "createDate" : "2012-12-24T19:16:00.687Z" , "modifiedDate" : "2012-12-24T19:10:46.727Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" : "" , "title" : "Action 1.3" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d8ab56c1f9f75655000007" , "createDate" : "2012-12-24T19:21:58.276Z" , "modifiedDate" : "2012-12-24T19:21:45.591Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" :  null  , "title" : "Action 1.4" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d8ac29c1f9f75655000009" , "createDate" : "2012-12-24T19:25:29.405Z" , "modifiedDate" : "2012-12-24T19:25:19.895Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" :  null  , "title" : "Action 1.5" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50d8acdec1f9f7565500000b" , "createDate" : "2012-12-24T19:28:30.317Z" , "modifiedDate" : "2012-12-24T19:28:19.870Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" :  null  , "title" : "Action 1.6" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50ad492a91dd950640000001" , "createDate" : "2012-11-21T21:35:38.215Z" , "modifiedDate" : "2012-11-21T21:35:16.273Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 1 , "targetDate" : "1/15/2013" , "title" : "Take another action bro! 1.1" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50b14062ba90fc0e13000011" , "createDate" : "2012-11-24T21:47:14.745Z" , "modifiedDate" : "2012-11-24T21:45:52.264Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" : "12/1/2012" , "title" : "Need to answer strategy questions" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "_id" : "50b14503ba90fc0e13000043" , "createDate" : "2012-11-24T22:06:59.675Z" , "modifiedDate" : "2012-11-24T22:04:36.944Z" , "owner" : { "userId" : "" , "userName" : ""} , "expanseId" : "50db42348ee191efa1f6732f" , "status" : 0 , "targetDate" :  null  , "title" : "Action Item 2" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b3553076d1011df8c650" , "title" : "Add hover text for item status" , "status" : 0 , "owner" : { "userId" : "" , "userName" : ""} , "targetDate" :  null  , "createDate" : "2013-02-23T19:58:44.492Z" , "modifiedDate" : "2013-02-23T19:53:29.039Z" , "_id" : "51291f74362b960000000009"}
	];


	var momentos = [
		{ "_id" : "50b13d08ba90fc0e13000001" , "createDate" : "2012-11-24T21:32:56.504Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note for second agenda" , "explorationId" : "50d8b3173076d1011df8c64a" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b13d80ba90fc0e13000003" , "createDate" : "2012-11-24T21:34:56.069Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Another note for second agenda" , "explorationId" : "50d8b3173076d1011df8c64a" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b13dc0ba90fc0e13000005" , "createDate" : "2012-11-24T21:36:00.577Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note for third agenda item" , "explorationId" : "50d8b3233076d1011df8c64b" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b13e02ba90fc0e13000007" , "createDate" : "2012-11-24T21:37:06.940Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Another third agenda item note" , "explorationId" : "50d8b3233076d1011df8c64b" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b13e89ba90fc0e13000009" , "createDate" : "2012-11-24T21:39:21.681Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Item Note" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b14025ba90fc0e1300000b" , "createDate" : "2012-11-24T21:46:13.128Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 2" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1407fba90fc0e13000013" , "createDate" : "2012-11-24T21:47:43.398Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 3" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1408bba90fc0e13000015" , "createDate" : "2012-11-24T21:47:55.504Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 4" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1408fba90fc0e13000017" , "createDate" : "2012-11-24T21:47:59.351Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 5" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b14095ba90fc0e13000019" , "createDate" : "2012-11-24T21:48:05.056Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 6" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1409eba90fc0e1300001b" , "createDate" : "2012-11-24T21:48:14.235Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 7" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142c9ba90fc0e1300001d" , "createDate" : "2012-11-24T21:57:29.141Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 8" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142ccba90fc0e1300001f" , "createDate" : "2012-11-24T21:57:32.685Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 9" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142d0ba90fc0e13000021" , "createDate" : "2012-11-24T21:57:36.645Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 10" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142d4ba90fc0e13000023" , "createDate" : "2012-11-24T21:57:40.043Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 11" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142ddba90fc0e13000025" , "createDate" : "2012-11-24T21:57:49.684Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 12" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142e1ba90fc0e13000027" , "createDate" : "2012-11-24T21:57:53.081Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 13" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142e4ba90fc0e13000029" , "createDate" : "2012-11-24T21:57:56.794Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 14" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142eeba90fc0e1300002b" , "createDate" : "2012-11-24T21:58:06.132Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 15" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b142f2ba90fc0e1300002d" , "createDate" : "2012-11-24T21:58:10.980Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 16" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1448bba90fc0e1300002f" , "createDate" : "2012-11-24T22:04:59.300Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 17" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1448fba90fc0e13000031" , "createDate" : "2012-11-24T22:05:03.620Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 18" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b14493ba90fc0e13000033" , "createDate" : "2012-11-24T22:05:06.994Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 19" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1449bba90fc0e13000035" , "createDate" : "2012-11-24T22:05:15.679Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 20" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b1449fba90fc0e13000037" , "createDate" : "2012-11-24T22:05:19.100Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 21" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b144a2ba90fc0e13000039" , "createDate" : "2012-11-24T22:05:22.047Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 22" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b144a6ba90fc0e1300003b" , "createDate" : "2012-11-24T22:05:26.019Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 23" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "_id" : "50b144abba90fc0e1300003d" , "createDate" : "2012-11-24T22:05:31.081Z" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Strategy Note 24" , "explorationId" : "50d8b32d3076d1011df8c64c" , "writer" : { "userId" : 1 , "userName" : "will"}}
		,{ "explorationId" : "50d8b3173076d1011df8c64a" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 2.3" , "createDate" : "2012-12-28T00:01:03.608Z" , "writer" : { "userId" : 1 , "userName" : "will"} , "_id" : "50dce13fa2d2024d12000003"}
		,{ "explorationId" : "50d8b3173076d1011df8c64a" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 2.4" , "createDate" : "2013-02-23T22:46:03.872Z" , "writer" : { "userName" : "Will"} , "_id" : "512946ab362b96000000000b"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Noe 1.1" , "createDate" : "2013-02-24T01:01:52.651Z" , "writer" : { "userName" : "Will"} , "_id" : "512966808498900000000018"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 2.2" , "createDate" : "2013-02-24T01:04:35.939Z" , "writer" : { "userName" : "Will"} , "_id" : "51296723849890000000001a"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 1.3" , "createDate" : "2013-02-24T01:06:33.224Z" , "writer" : { "userName" : "Will"} , "_id" : "51296799849890000000001c"}
		,{ "explorationId" : "50d8b36a3076d1011df8c652" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 10.1" , "createDate" : "2013-02-24T01:21:22.240Z" , "writer" : { "userName" : "Will"} , "_id" : "51296b12849890000000002d"}
		,{ "explorationId" : "50d8b36a3076d1011df8c652" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 10.2" , "createDate" : "2013-02-24T01:21:42.218Z" , "writer" : { "userName" : "Will"} , "_id" : "51296b26849890000000002f"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 1.4" , "createDate" : "2013-02-24T04:02:29.929Z" , "writer" : { "userName" : "Will"} , "_id" : "512990d53c12d10000000001"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 1.5" , "createDate" : "2013-02-24T19:09:08.088Z" , "writer" : { "userName" : "Will"} , "_id" : "512a65543c12d10000000006"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 1.6" , "createDate" : "2013-02-24T19:16:24.734Z" , "writer" : { "userName" : "Will"} , "_id" : "512a67083c12d10000000008"}
		,{ "explorationId" : "50d8b2fb3076d1011df8c649" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 1.7" , "createDate" : "2013-02-25T00:55:53.414Z" , "writer" : { "userName" : "Will"} , "_id" : "512ab6993c12d1000000000d"}
		,{ "explorationId" : "50d8b3173076d1011df8c64a" , "expanseId" : "50db42348ee191efa1f6732f" , "text" : "Note 2.5" , "createDate" : "2013-02-25T01:30:36.184Z" , "writer" : { "userName" : "Will"} , "_id" : "512abebc3c12d10000000014"}
	];


	var inquiries = [
		{ "_id" : "50bd95ac3f60a61804000011" , "answer" :  null  , "answeredOn" :  null  , "askedOn" : "2012-12-04T06:18:20.691Z" , "question" : "New question" , "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b2fb3076d1011df8c649"}
		,{ "_id" : "50b14049ba90fc0e1300000f" , "answer" :  null  , "answeredOn" :  null  , "askedOn" : "2012-11-24T21:46:49.252Z" , "question" : "Can we add new questions for strategy?" , "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "_id" : "50b144f3ba90fc0e13000041" , "answer" :  null  , "answeredOn" :  null  , "askedOn" : "2012-11-24T22:06:43.295Z" , "question" : "Strategy Question 2" , "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b32d3076d1011df8c64c"}
		,{ "_id" : "512ace713c12d1000000001d" , "answer" : "Tomorrow's Answer" , "answeredOn" : "2013-02-25T02:37:58.867Z" , "askedOn" : "2013-02-25T02:37:37.572Z" , "question" : "Question 3.1" , "expanseId" : "50db42348ee191efa1f6732f" , "explorationId" : "50d8b3233076d1011df8c64b"}
	];


	self.users = [
		{ "_id" : "gordon.solomon@bornmonday.com" , "fullName" : "Solomon Grundy" , "password" : "grundy" , "spaces" : [ "50db42348ee191efa1f6732f" , "50db42528ee191efa1f67331"] , "username" : "grundy"}
		,{ "_id" : "will.strye@malignantgenius.com" , "fullName" : "Will Strye" , "password" : "will" , "spaces" : [ "50db42348ee191efa1f6732f" , "50db42488ee191efa1f67330" , "50db42528ee191efa1f67331"] , "username" : "Will"}
	];


}());