public with sharing class contentHandler {
    @AuraEnabled(cacheable = true)
    public static List<Content__c> getContent(String recordId,String recordType){
        try {
            System.debug(recordId);
            if(recordType=='Topic'){
                return [select Id,Name,SubContent_Detail__c from Content__c where Topic__c=:recordId];
            }
            if(recordType=='Course'){
                return [select Id,Name,SubContent_Detail__c from Content__c where Course__c=:recordId];
            }
            if(recordType=='Section'){
                return [select Id,Name,SubContent_Detail__c from Content__c where Section__c=:recordId];
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}