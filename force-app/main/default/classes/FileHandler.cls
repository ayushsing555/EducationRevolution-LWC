public with sharing class FileHandler {
    @AuraEnabled(cacheable = true)
    public static List<Id> getFiles(String recordId){
        try {
           List<ContentDocumentLink>documentsId =  [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
           List<Id> ListIds = new list<Id>();
           System.debug(documentsId);
           for(ContentDocumentLink doc:documentsId){
            ListIds.add(doc.ContentDocumentId);
           }
           System.debug(ListIds);
           return ListIds;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<contentDocument> getFilesWithName(String recordId){
        try {
            List<ContentDocumentLink>documentsId =  [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
           List<Id> ListIds = new list<Id>();
           for(ContentDocumentLink doc:documentsId){
            ListIds.add(doc.ContentDocumentId);
           }
           List<contentDocument> fileNameAndID = [select Title,Id from contentDocument WHERE Id In :ListIds];
           return fileNameAndID;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<ContentDistribution> getFilesWithTitle(){
        try {
            return [SELECT ContentDocumentId, ContentDownloadUrl, DistributionPublicUrl, ViewCount, Name FROM ContentDistribution];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateFile(List<ContentDistribution> ListOfFiles){
        try {
            update ListOfFiles;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}