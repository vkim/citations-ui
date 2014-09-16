<!DOCTYPE html>
<html lang="en" ng-app="esApp">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="wrapper" ng-controller="mainController">
        <!-- Column 1 -->
        <div class="col1">

            <div class="pull-left">

                <ul ng-repeat="item in back_citations_left">
                    <li>
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li class="_hover">
                        {{item.citation }}
                    </li>
                </ul>

            </div>

            <div class="pull-right">

                <ul ng-repeat="item in back_citations_right">
                    <li>
                        {{item.citation}}
                    </li>
                    <li class="_hover">
                        Title <br>
                        Author1, author2, author3, author4 <br>
                        Year <br>
                        Journal
                    </li>
                </ul>

            </div>

        </div><!--end column 1 -->

        <!-- Column 2 -->
        <div class="col2">

            <ul>
                <li class="arrow">&rarr;</li>
                <li>
                    <div>
                        Author1, author2, author3 <br>
                        <span class="title_i">Title</span>
                        <span class="year_i">Year</span>
                    </div>
                </li>
                <li class="arrow">&rarr;</li>

            </ul>

        </div><!--end column 2 -->

        <!-- Column 3 -->
        <div class="col3">

            <div class="pull-left">
                <ul ng-repeat="item in forward_citations_left">
                    <li>
                        {{item.citation}}
                    </li>
                    <li class="_hover">
                        Title <br>
                        Author1, author2, author3, author4 <br>
                        Year <br>
                        Journal
                    </li>
                </ul>
            </div>

            <div class="pull-right">
                <ul ng-repeat="item in forward_citations_right">
                    <li>
                        {{item.citation}}
                    </li>
                    <li class="_hover">
                        Title <br>
                        Author1, author2, author3, author4 <br>
                        Year <br>
                        Journal
                    </li>
                </ul>
            </div>

        </div>
        <!--end column 3 -->

    </div>
    <script src="angular.js"></script>
    <script src="angular-route.js"></script>
    <script src="script.js"></script>
</body>
</html>