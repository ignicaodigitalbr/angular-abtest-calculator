(function() {
  'use strict';

  angular
    .module('ABTestCalculator-mock')
    .factory('ABTestRelevanceDataMock', ABTestRelevanceDataMock);


  function ABTestRelevanceDataMock() {
    return {
      percantegeStandardError: [
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
      ],
      distNorm: [
        {params: {score: 1.7216713633, mean: 0, sd: 1, cumulative: true}, result: 0.9574354661640616 },
        {params: {score: 2.3867319633, mean: 0, sd: 1, cumulative: true}, result: 0.9915005601156361 }
      ],
      statisticalRelevance: [
        {
          params: [
            { access: 1000, goals: 30 },
            { access: 1000, goals: 32 },
            { access: 1001, goals: 55 },
            { access: 1000, goals: 35 }
          ],
          result: [
            { rate: 3, type: 'pattern' },
            { rate: 3.2, zScore: -0.2580355189695215, pValue: 0.39818974750130653, confidentiality: 60.18 },
            { rate: 5.49, zScore: -2.7721139209341543, pValue: 0.002784677087099785, confidentiality: 99.72 },
            { rate: 3.5, zScore: -0.6305666611194322, pValue: 0.2641619516715518, confidentiality: 73.58 }
          ]
        },
        {
          params: [
            { access: 2000, goals: 43 },
            { access: 2000, goals: 25 },
            { access: 2001, goals: 103 },
            { access: 2000, goals: 52 }
          ],
          result: [
            { rate: 2.15, zScore: -2.202949711899725, pValue: 0.013799146625689707, confidentiality: 98.62},
            { rate: 1.25, type: 'pattern'},
            { rate: 5.15, zScore: -7.0488121752244455, pValue: 9.022782521128647e-13, confidentiality: 100},
            { rate: 2.6, zScore: -3.1107415254091912, pValue: 0.0009330910568379758, confidentiality: 99.91}
          ]
        }
      ],
      resultsStatisticalRelevance: [
      ]
    };
  }

})();
