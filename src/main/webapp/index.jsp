<!DOCTYPE html>
<html lang="en" ng-app="esApp">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<link rel="stylesheet" href="style.css">
</head>
<body ng-controller="mainController">
    <div class="search_section">
        <input type="text" name="search" ng-model="search_string" placeholder="citation">
        <span class="search_icon">&nbsp;</span>
        <input type="button" name="search_button" ng-click="search(search_string)">
    </div><!-- search_section -->

    <div class="wrapper">
        <!-- Column 1 -->
        <div class="col1">

            <div class="pull-left">

                <ul ng-repeat="item in back_citations_left">
                    <li ng-if="item.isgrey" ng-class="item.isgrey">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li ng-if="!item.isgrey" ng-click="next(item)">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li class="_hover">
                        {{item.citation }}
                    </li>
                </ul>

            </div>

            <div class="pull-right">

                <ul ng-repeat="item in back_citations_right">
                    <li ng-if="item.isgrey" ng-class="item.isgrey">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li ng-if="!item.isgrey" ng-click="next(item)">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li class="_hover">
                        {{item.citation }}
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
                        {{main.citation}}
                    </div>
                </li>
                <li class="arrow">&rarr;</li>

            </ul>

        </div><!--end column 2 -->

        <!-- Column 3 -->
        <div class="col3">

            <div class="pull-left">
                <ul ng-repeat="item in forward_citations_left">
                    <li ng-if="item.isgrey" ng-class="item.isgrey">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li ng-if="!item.isgrey" ng-click="next(item)">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li class="_hover">
                        {{item.citation}}
                    </li>
                </ul>
            </div>

            <div class="pull-right">
                <ul ng-repeat="item in forward_citations_right">
                    <li ng-if="item.isgrey" ng-class="item.isgrey">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li ng-if="!item.isgrey" ng-click="next(item)">
                        {{item.citation | limitTo: 150}}
                    </li>
                    <li class="_hover">
                        {{item.citation}}
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