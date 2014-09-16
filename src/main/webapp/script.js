
var esApp = angular.module('esApp', []);

/*esApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/main.html',
            controller  : 'mainController'
        });
});*/


esApp.controller('mainController', function($scope, $http) {

    var request = $http({
        method: "post",
        url: "references",
        data: {
            citation: "Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269."
        }
    });

    request.success(
        function( data ) {

            //if back links exist
            if(data && data.backwards) {

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


    /*$scope.back_citations_left = [
        {
            "MID":153,
            "citation":"Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.",
            "unknown0":"10.1097/01.inf.0000144680.39895.ce",
            "title":"Pandemic Influenza: Is an Antiviral Response Realistic?",
            "authors":"[[u'Frederick', u'G.', u'Hayden']]",
            "journal":"Pediatric Infectious Disease Journal",
            "year":2004,
            "url":"[u'http://content.wkhealth.com/linkback/openurl?sid=WKPTLP:landingpage&an=00006454-200411001-00012']"
        },
        {
            "MID":153,
            "citation":"Matrosovich MN, Matrosovich TY, Gray T. Neuraminidase is important for the initiation of influenza virus infection in human... J Virol 2004;78:12665-7.",
            "unknown0":"10.1128/JVI.78.22.12665-12667.2004",
            "title":"Neuraminidase Is Important for the Initiation of Influenza Virus Infection in Human Airway Epithelium",
            "authors":"[[u'Mikhail', u'N.', u'Matrosovich'], [u'Tatyana', u'Y.', u'Matrosovich'], [u'Thomas', u'', u'Gray'], [u'Noel', u'A.', u'Roberts'], [u'Hans-Dieter', u'', u'Klenk']]",
            "journal":"Journal of Virology",
            "year":2004,
            "url":"[u'http://jvi.asm.org/cgi/reprint/78/22/12665.pdf', u'http://jvi.asm.org/cgi/doi/10.1128/JVI.78.22.12665-12667.2004']"
        }];

    $scope.back_citations_right = [
        {
            "MID":153,
            "citation":"Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.",
            "unknown0":"10.1097/01.inf.0000144680.39895.ce",
            "title":"Pandemic Influenza: Is an Antiviral Response Realistic?",
            "authors":"[[u'Frederick', u'G.', u'Hayden']]",
            "journal":"Pediatric Infectious Disease Journal",
            "year":2004,
            "url":"[u'http://content.wkhealth.com/linkback/openurl?sid=WKPTLP:landingpage&an=00006454-200411001-00012']"
        },
        {
            "MID":153,
            "citation":"Matrosovich MN, Matrosovich TY, Gray T. Neuraminidase is important for the initiation of influenza virus infection in human... J Virol 2004;78:12665-7.",
            "unknown0":"10.1128/JVI.78.22.12665-12667.2004",
            "title":"Neuraminidase Is Important for the Initiation of Influenza Virus Infection in Human Airway Epithelium",
            "authors":"[[u'Mikhail', u'N.', u'Matrosovich'], [u'Tatyana', u'Y.', u'Matrosovich'], [u'Thomas', u'', u'Gray'], [u'Noel', u'A.', u'Roberts'], [u'Hans-Dieter', u'', u'Klenk']]",
            "journal":"Journal of Virology",
            "year":2004,
            "url":"[u'http://jvi.asm.org/cgi/reprint/78/22/12665.pdf', u'http://jvi.asm.org/cgi/doi/10.1128/JVI.78.22.12665-12667.2004']"
        }];

    $scope.forward_citations_left = [
        {
            "MID":153,
            "citation":"Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.",
            "unknown0":"10.1097/01.inf.0000144680.39895.ce",
            "title":"Pandemic Influenza: Is an Antiviral Response Realistic?",
            "authors":"[[u'Frederick', u'G.', u'Hayden']]",
            "journal":"Pediatric Infectious Disease Journal",
            "year":2004,
            "url":"[u'http://content.wkhealth.com/linkback/openurl?sid=WKPTLP:landingpage&an=00006454-200411001-00012']"
        },
        {
            "MID":153,
            "citation":"Matrosovich MN, Matrosovich TY, Gray T. Neuraminidase is important for the initiation of influenza virus infection in human... J Virol 2004;78:12665-7.",
            "unknown0":"10.1128/JVI.78.22.12665-12667.2004",
            "title":"Neuraminidase Is Important for the Initiation of Influenza Virus Infection in Human Airway Epithelium",
            "authors":"[[u'Mikhail', u'N.', u'Matrosovich'], [u'Tatyana', u'Y.', u'Matrosovich'], [u'Thomas', u'', u'Gray'], [u'Noel', u'A.', u'Roberts'], [u'Hans-Dieter', u'', u'Klenk']]",
            "journal":"Journal of Virology",
            "year":2004,
            "url":"[u'http://jvi.asm.org/cgi/reprint/78/22/12665.pdf', u'http://jvi.asm.org/cgi/doi/10.1128/JVI.78.22.12665-12667.2004']"
        }];

    $scope.forward_citations_right = [
        {
            "MID":153,
            "citation":"Hayden FG. Pandemic influenza: is an antiviral response realistic? Pediatr Infect Dis J 2004;23:Suppl:S262-S269.",
            "unknown0":"10.1097/01.inf.0000144680.39895.ce",
            "title":"Pandemic Influenza: Is an Antiviral Response Realistic?",
            "authors":"[[u'Frederick', u'G.', u'Hayden']]",
            "journal":"Pediatric Infectious Disease Journal",
            "year":2004,
            "url":"[u'http://content.wkhealth.com/linkback/openurl?sid=WKPTLP:landingpage&an=00006454-200411001-00012']"
        },
        {
            "MID":153,
            "citation":"Matrosovich MN, Matrosovich TY, Gray T. Neuraminidase is important for the initiation of influenza virus infection in human... J Virol 2004;78:12665-7.",
            "unknown0":"10.1128/JVI.78.22.12665-12667.2004",
            "title":"Neuraminidase Is Important for the Initiation of Influenza Virus Infection in Human Airway Epithelium",
            "authors":"[[u'Mikhail', u'N.', u'Matrosovich'], [u'Tatyana', u'Y.', u'Matrosovich'], [u'Thomas', u'', u'Gray'], [u'Noel', u'A.', u'Roberts'], [u'Hans-Dieter', u'', u'Klenk']]",
            "journal":"Journal of Virology",
            "year":2004,
            "url":"[u'http://jvi.asm.org/cgi/reprint/78/22/12665.pdf', u'http://jvi.asm.org/cgi/doi/10.1128/JVI.78.22.12665-12667.2004']"
        }];*/

});


