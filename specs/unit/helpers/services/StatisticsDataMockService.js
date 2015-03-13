(function() {
  'use strict';

  angular
    .module('NgCalculator-mock')
    .factory('StatisticsDataMock', StatisticsDataMock);


  function StatisticsDataMock() {
    return {
      percantegeStandardError : [
        {access: 1, goals: 0, result: 0},
        {access: 2000, goals: 134, result: 0.005590661857061291},
        {access: 1000, goals: 200, result: 0.01264911064067352},
        {access: 500, goals: 250, result: 0.022360679774997897},
        {access: 232, goals: 139, result: 0.03217487712849312}
      ],
      standardError: [
        {params: [0, 0], result: 0},
        {params: [2, 3], result: 3.605551275463989},
        {params: [7, 35], result: 35.6931365951495},
        {params: [2.7, 20.1], result: 20.280532537386687},
        {params: [9.1, 10.2, 13.6], result: 19.282375372344557},
        {params: [29.19, 29.18, 41.27, 20.9], result: 61.99638215250951}
      ]
    };
  }

})();
