public with sharing class sectionHandler {
    @AuraEnabled(cacheable = true)
    public static List<Section__c> getSection(String courseId){
        try {
            if(courseId != null && courseId != ''){
                return [select Id,Name,Topics__c from Section__c where Course__c = :courseId];
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}