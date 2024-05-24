public with sharing class TopicHandler {
    @AuraEnabled(cacheable = true)
    public static List<Topic__c> getTopic(String SectionId){
        try {
            System.debug(SectionId);
            if(SectionId!=null && SectionId!=''){
                return [select Id,Name from Topic__c where Sections__c=:SectionId];
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}