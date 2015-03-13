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
     *
     * @param  {Array} variations
     * @return {Object | Boolean}
     */
    this.statisticalRelevance = function(variations) {
      if (!angular.isArray(variations)) {
        return false;
      }

      var thePattern = getPattern(variations);

      if(!thePattern){
        return false;
      }

      var self = this,

          pattern_p_av = thePattern.goals / thePattern.access,

          pattern_p_error = this.percentageStandardError(thePattern.access, thePattern.goals),

          variation_p_av = 0,

          variation_p_error = 0,

          standard_error = 0,

          z_score = 0,

          p_value = 0,

          result = [];

      variations.forEach(function(variation, index){

        variation_p_av = variation.goals / variation.access;
        variation_p_error = self.percentageStandardError(variation.access, variation.goals);

        if( angular.isDefined(variation.index) && variation.index === index){
          result[index] = {rate: variation_p_av, type: 'pattern'};
          return;
        }

        standard_error = self.standardError([pattern_p_error, variation_p_error]);

        z_score = (pattern_p_av + variation_p_av) / standard_error;

        p_value = self.normalDistribution( z_score, 0, 1, true );

        result[index] = {rate: variation_p_av, z_score: z_score, p_value: p_value};
      });


      return result;

    }

    function getPattern (variations) {
      try {
        variations.forEach(function(variation){
          if (
              !angular.isNumber(variation.goals) ||
              !angular.isNumber(variation.access)
            ) {
            throw "Invalid variation param type was provided";
          }
          });
      } catch (e) {
        return false;
      }

      var thePattern = variations[0],
          aux_variation_rate = variations[0].goals / variations[0].access;

      thePattern.index = 0;

      variations.forEach(function(variation, index){
        if ( (variation.goals / variation.access)  < aux_variation_rate  ) {
          thePattern = variation;
          thePattern.index = index;

          aux_variation_rate = (variation.goals / variation.access);
        }
      });

      return thePattern;

    }
  }

})();
