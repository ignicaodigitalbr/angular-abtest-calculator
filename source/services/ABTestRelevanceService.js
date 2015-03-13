(function() {
  'use strict';

  angular
    .module('NgCalculator')
    .service('ABTestRelevanceService', ABTestRelevanceService);


  function ABTestRelevanceService() {

    /**
     * Calculate the standard error of to measures
     *
     * @param {Float} access
     * @param {Float} goals
     * @throws {String} If params isn't float
     *
     * @return {Float}
     */
    this.percentageStandardError = function(access, goals){
      if (!angular.isNumber(access) || !angular.isNumber(goals)) {
        throw "Invalid params was provided.";
      }

      if(0 === access) {
        throw "Access can't be 0 (zero).";
      }

      if ( goals > access) {
        throw "Goals can't be greater than access.";
      }

      var standardError,

          percentage = goals / access,

          sd = percentage * (1 - percentage) / access;

      standardError = Math.sqrt(sd);

      return standardError;
    }

    /**
     * Standard Error
     *
     * @param  {Array} measures array of measures
     * @return {Float}
     */
    this.standardError = function(measures){
      if (!angular.isArray(measures)){
        throw "Invalid param was provided.";
      }

      var standardError = 0;

      measures.forEach(function(value){
        standardError += value * value;
      });

      return Math.sqrt(standardError);
    }

    /**
     * Normal distribuition calc
     *
     * @param  {Float} score
     * @param  {Float} mean
     * @param  {Float} sd
     * @param  {Boolean} cumulative
     *
     * @return {Float}
     */
    this.normalDistribution = function(score, mean, sd, cumulative){
      if (
        !angular.isNumber(score) ||
        !angular.isNumber(mean) ||
        !angular.isNumber(sd)
      ) {
        return false;
      }

      if (sd <= 0) {
        return false;
      }

      return (cumulative) ? jStat.normal.cdf(score, mean, sd) : jStat.normal.pdf(score, mean, sd);
    }

    /**
     * Calculate significance
     * @param  {Integer} c_t control visits
     *
     * @return {String}
     */
    this.statisticalRelevance = function(patternAccess, patternVisitors, variations){
      //TODO
    }

  }

})();
