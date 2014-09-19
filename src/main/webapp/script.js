
var esApp = angular.module('esApp', []);


esApp.controller('mainController', function($scope, $http) {

    $scope.next = function(reference) {

        if(reference && reference["citation"]) {
            getReferences(reference["citation"]);
        }

    };

    $scope.search = function(search_string) {
        if(search_string) {
            getReferences(search_string);
        }
    };

    //"Sullivan KM, Monto AS, Longini IM. Estimates of the US health impact of influenza. Am J Public Health. 1993;83:1712-1716."
    function getReferences(cite) {

        if(cite) {

            $http({
                method: "post",
                url: "references",
                data: {
                    citation: cite
                }
            }).success(
                function( data ) {

                    $scope.main = data;

                    //if back links exist
                    if(data && data.backwards) {

                        for (var i in data.backwards) {
                            if (data.backwards[i].hasOwnProperty('forwards') && data.backwards[i].forwards.length < 2 && !data.backwards[i].backwards) {

                                if(data.backwards[i].backwards) console.log("data.backwards[i].backwards: " + data.backwards[i].backwards.length);
                                if(data.backwards[i].forwards) console.log("data.backwards[i].forwards: " + data.backwards[i].forwards.length);

                                data.backwards[i].isgrey = 'gray';
                            }
                        }

                        var backwards_right = data.backwards;

                        var backwards_left = backwards_right.splice(0, Math.floor(backwards_right.length / 2));
                        $scope.back_citations_left = backwards_left;
                        $scope.back_citations_right = backwards_right;
                    }
                    else {
                        $scope.back_citations_left = [];
                        $scope.back_citations_right = [];
                    }

                    //if forward links exist
                    if(data && data.forwards) {

                        for (var i in data.forwards) {
                            if (!data.forwards[i].hasOwnProperty("backwards") && !data.forwards[i].hasOwnProperty("forwards")) {
                                data.forwards[i].isgrey = 'gray';
                            }
                        }

                        var forwards_right = data.forwards;

                        var forwards_left = forwards_right.splice(0, Math.floor(forwards_right.length / 2));
                        $scope.forward_citations_left = forwards_left;
                        $scope.forward_citations_right = forwards_right;
                    }
                    else {
                        $scope.forward_citations_left = [];
                        $scope.forward_citations_right = [];
                    }

                }
            );
        }
    };

    getReferences("McElhaney, J., , The unmet need in the elderly: Designing new influenza vaccines for older adults, Vaccine, 2005");
});


