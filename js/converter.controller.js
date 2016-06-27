(function () {

	var app = angular.module('Converter', []);
	app.controller('ConverterCtrl', function ($scope) {
		var result,
				table = document.getElementById('table');
		
	
		// this is where the actual calculation happens
		function convertThis(conv) {
			if ($scope.which == 0) {
				result = conv * (9 / 5) + 32; // C to F
			} else {
				result = (conv - 32) * (5 / 9); // F to C
			}
			result = result.toFixed(1);
			return result;
		}

		// convert the input
		function totalize() {
			var conv = $scope.newConversion;
			convertThis(conv);
			$scope.total = result;
		}

		// create a thermometer
		function createMeter() {
			var meter = document.getElementById('grad-marks');
			meter.innerHTML = null;
			var h = 20;
			var conv = $scope.newConversion;
			conv = conv - 20;

			function createSpan(row) {
				convertThis(conv);
				var span = document.createElement('span');
				span.innerHTML = '<div class="grad-mark symbol-from ' + row + '">' + conv + '</div><div class="grad-mark symbol-to ' + row + '">' + result + '</span>';
				meter.appendChild(span);
			}

			for ( var i=0;i< 5;i++ ) {
				convertThis(conv);
				var row = 'row' + i;
				createSpan(row);
				conv = conv + 10;
			}
		}
		
		// create the theemometer when document is ready
		angular.element(document).ready(function () {
    	createMeter();
    });

		// this happens when the form is submitted
		$scope.submitItem = function () {
			totalize();			
			createMeter();
		};

		// put the right conversion symbols in place, e.g. °C or °F
		$scope.setSymbols = function () {
			// reset the input and total
			$scope.newConversion = '';
			$scope.total = 0;
			$scope.tableShow = 0;
			table.innerHTML = '';
			document.querySelectorAll('#table').innerHTML = null;
			createMeter();

			// set the C and F symbols
			if ($scope.which == 0) {
				$scope.symbolFrom = 'C';
				$scope.symbolTo = 'F';
			} else {
				$scope.symbolFrom = 'F';
				$scope.symbolTo = 'C';
			}
		}
		
		// this creates a conversion table
		$scope.createTable = function () {
			var interval = Number($scope.interval);
			var conv = interval,
				rows = interval;

			for (var i = 0; i < 3; i++) {
				// set header rows
				var ul = document.createElement('ul');
				var li = document.createElement('li');
				li.innerHTML = '<span class="left top-row col-md-6">&deg;' + $scope.symbolFrom + '</span><span class="right top-row col-md-6">&deg;' + $scope.symbolTo + '</span>';
				ul.appendChild(li);

				// create converted rows
				for (var j = 0; j < 10; j++) {
					convertThis(conv);
					var li = document.createElement('li');
					li.innerHTML = '<span class="left col-md-6">' + rows + '</span><span class="right col-md-6">' + result + '</span>';
					ul.appendChild(li);
					conv = conv + interval;
					rows = rows + interval;
				}
				ul.setAttribute('class', 'col-sm-4 col-xs-12');
				table.appendChild(ul);
			}
			$scope.tableShow = 1;
		};

	});
})();