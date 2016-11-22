angular.module('compromissosApp', [])
    .controller('compromissosListController', function($scope, $http) {

        var compromissosList = this;

        $scope.compromissos = [];
        $scope.model = {};

        $http.get('/api/compromissos')
            .success(function(data) {

                $scope.compromissos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        compromissosList.addCompromisso = function() {

            $http.post('/api/compromissos', $scope.model)
                .success(function(data) {
                    $scope.model = {};

                    $scope.compromissos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            $('#modalCompromisso').modal('toggle');

        };

        compromissosList.remaining = function() {
            var count = 0;
            angular.forEach($scope.compromissos, function(compromisso) {
                count += compromisso.done ? 0 : 1;
            });
            return count;
        };


        compromissosList.removeCompromisso = function(id){
            $http.post('/api/compromissos/' + id + '/remove')
                .success(function(data) {
                    $scope.compromissos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    });
    $('#button').submit(function() {
        // Coding

        return false;
    });
