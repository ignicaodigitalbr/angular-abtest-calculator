describe('Graph data Validator', function() {
  'use strict';

  beforeEach(module('NgCalculator'));
  beforeEach(module('NgCalculator-mock'));

  var statisticsService,
      statisticsDataMock;

  beforeEach(inject(function(StatisticsService, StatisticsDataMock) {
    statisticsService = StatisticsService;
    statisticsDataMock = StatisticsDataMock;
  }));

  describe('Standard Error Percentage', function() {
    it('should throw when no params is provided', function() {
      expect(function(){
        statisticsService.percentageStandardError();
      }).toThrow();
    });

    it('should throw when string params is provided', function() {
      expect(function(){
        statisticsService.percentageStandardError('', '');
      }).toThrow();

      expect(function(){
        statisticsService.percentageStandardError('', 0);
      }).toThrow();

      expect(function(){
        statisticsService.percentageStandardError(0, '0');
      }).toThrow();
    });

    it('should throw when access is 0 (zero) params is provided', function() {
      expect(function(){
        statisticsService.percentageStandardError(0, 1);
      }).toThrow();
    });

    it('should throw when goals is greater then access params is provided', function() {
      expect(function(){
        statisticsService.percentageStandardError(1, 2);
      }).toThrow();
    });

    it('should return correct calc values', function() {
      var data = statisticsDataMock.percantegeStandardError,
          params = {};

      for(var index in data){
        params = data[index];

        expect(statisticsService.percentageStandardError(params.access, params.goals)).toEqual(params.result);
      }
    });
  });


  describe('Standard Error', function() {
    it('should throw when no param is provided', function() {
      expect(function(){
        statisticsService.standardError();
      }).toThrow();
    });

    it('should throw when invalid param is provided', function() {
      expect(function(){
        statisticsService.standardError('');
      }).toThrow();

      expect(function(){
        statisticsService.standardError(0);
      }).toThrow();

      expect(function(){
        statisticsService.standardError({});
      }).toThrow();
    });

    it('should return correct calc values', function() {
      var data = statisticsDataMock.standardError,
          test = {};

      for(var index in data){
        test = data[index];

        expect(statisticsService.standardError(test.params)).toEqual(test.result);
      }
    });
  });

});
