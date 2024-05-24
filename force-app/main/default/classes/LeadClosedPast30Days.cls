public with sharing class LeadClosedPast30Days implements  Database.Batchable<sObject> {
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('select Id,Status from Lead where CreatedDays__c<=30');
    }

    public void execute(Database.BatchableContext bc,List<Lead>leadList){
        for(Lead lead1:leadList){
            lead1.status = 'Closed - Not Converted';
        }
        update leadList;
    }

    public void finish(Database.BatchableContext bc){
        AsyncApexJob aaj  = [select Id,Status,JobItemsProcessed,TotalJobItems,NumberOfErrors from AsyncApexJob where Id =:bc.getJobId()];    
    }
}