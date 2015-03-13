describe('Graph data Validator', function() {
  'use strict';

  beforeEach(module('NgCalculator'));
  beforeEach(module('NgCalculator-mock'));

  var abTestRelevanceService,
      abTestRelevanceDataMock;

  beforeEach(inject(function(ABTestRelevanceService, ABTestRelevanceDataMock) {
    abTestRelevanceService = ABTestRelevanceService;
    abTestRelevanceDataMock = ABTestRelevanceDataMock;
  }));

  describe('Standard Error Percentage', function() {
    it('should throw when no params is provided', function() {
      expect(function(){
        abTestRelevanceService.percentageStandardError();
      }).toThrow();
    });

    it('should throw when string params is provided', function() {
      expect(function(){
        abTestRelevanceService.percentageStandardError('', '');
      }).toThrow();

      expect(function(){
        abTestRelevanceService.percentageStandardError('', 0);
      }).toThrow();

      expect(function(){
        abTestRelevanceService.percentageStandardError(0, '0');
      }).toThrow();
    });

    it('should throw when access is 0 (zero) params is provided', function() {
      expect(function(){
        abTestRelevanceService.percentageStandardError(0, 1);
      }).toThrow();
    });

    it('should throw when goals is greater then access params is provided', function() {
      expect(function(){
        abTestRelevanceService.percentageStandardError(1, 2);
      }).toThrow();
    });

    it('should return correct calc values', function() {
      var data = abTestRelevanceDataMock.percantegeStandardError,
          params = {};

      for(var index in data){
        params = data[index];

        expect(abTestRelevanceService.percentageStandardError(params.access, params.goals)).toEqual(params.result);
      }
    });
  });


  describe('Standard Error', function() {
    it('should throw when no param is provided', function() {
      expect(function(){
        abTestRelevanceService.standardError();
      }).toThrow();
    });

    it('should throw when invalid param is provided', function() {
      expect(function(){
        abTestRelevanceService.standardError('');
      }).toThrow();

      expect(function(){
        abTestRelevanceService.standardError(0);
      }).toThrow();

      expect(function(){
        abTestRelevanceService.standardError({});
      }).toThrow();
    });

    it('should return correct calc values', function() {
      var data = abTestRelevanceDataMock.standardError,
          test = {};

      for(var index in data){
        test = data[index];

        expect(abTestRelevanceService.standardError(test.params)).toEqual(test.result);
      }
    });
  });

  describe('Normal Distribuition', function() {
    it('should return false if no param is provided', function() {
      expect(abTestRelevanceService.normalDistribution()).toBe(false);
    });

    it('should return false if invalid sd is provided', function() {
      expect(abTestRelevanceService.normalDistribution(1.293817283, 0,0,true)).toBe(false);
    });

    it('should return correct normal distribution', function() {
      var data = abTestRelevanceDataMock.distNorm,
          test = {};

      for(var index in data){
        test = data[index];

        expect(abTestRelevanceService.normalDistribution(test.params.score, test.params.mean, test.params.sd, test.params.cumulative)).toEqual(test.result);
      }
    });
  });


  describe('Statistical Relevance', function() {
    it('should return false when no params is provided', function() {
      expect(abTestRelevanceService.statisticalRelevance()).toBe(false);
    });

    it('should return false when string params is provided', function() {
      expect(abTestRelevanceService.statisticalRelevance('','0', '12', 'true')).toBe(false);
    });

    it('should return false when object params is provided', function() {
      expect(abTestRelevanceService.statisticalRelevance({}, {}, {}, {})).toBe(false);
    });

    it('should return false when access as 0 is provided', function() {
      expect(abTestRelevanceService.statisticalRelevance(0, 201, {invalid: '123'})).toBe(false);
    });

    it('should return false when invalid variation is provided', function() {
      expect(abTestRelevanceService.statisticalRelevance(123123, 201, [{invalid: '123'}])).toBe(false);
    });

    it('TEST', function() {
      console.log(abTestRelevanceService.statisticalRelevance([
        {access: 4000, goals: 132},
        {access: 4000, goals: 134},
        {access: 4000, goals: 139},
        {access: 4000, goals: 146}])
      );
    });

  });

});
