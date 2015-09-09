angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){

	var vm = this;

	Story.allStory()
		.success(function(data){
			vm.stories = data;
		});

	// vm.createStory = function(){

	// 	vm.message = '';

	// 	Story.create(vm.storyData)
	// 		.success(function(response){
	// 			vm.stories.push(vm.storyData);
	// 			vm.storyData = {};
	// 			vm.message = response.data.message;
	// 		});
	// };


	vm.createStory = function(){

		vm.processing = true;
		vm.message = '';

		Story.create(vm.storyData)
			.success(function(data){
				vm.processing = false;
				vm.storyData = {};
				vm.message = data.message;
			});
	};


	socketio.on('story', function(data){
		vm.stories.push(data)
	})		


})


.controller('AllStoriesController', function(stories, socketio){

	var vm = this;
	vm.stories = stories.data;

	socketio.on('story', function(data){
		vm.stories.push(data)
	})	

})
