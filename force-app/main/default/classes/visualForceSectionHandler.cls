public with sharing class visualForceSectionHandler {
    public Map<Id,String>SectionName{get;set;}
    public String name{get;set;}
    public Map<Id,boolean>deleteSection{get;set;}
    public List<Section__c> getSections(){
        SectionName = new Map<Id,String>();
        deleteSection = new Map<Id,boolean>();
        String Query = '';
        if(name==null) {
            Query = 'select Id,Name ,topics__c from Section__c';
        }
        else{
            Query = 'select Id,Name,topics__c from Section__c where Name Like \'%'+name+'%\'';
        }
        List<Section__c>listOfSections = Database.query(Query);
        System.debug(listOfSections);
        for(Section__c section:listOfSections){
            SectionName.put(section.Id,section.Name);
            deleteSection.put(section.Id,false);
        }
        System.debug(SectionName);
        return Database.query(Query);
    }

    public void updateSection(){
        List<Section__c>updateSectionList = [select Id,Name from Section__c];
        for(Section__c section:updateSectionList) {
            section.Name =  SectionName.get(section.Id);
        }
        update updateSectionList;
    }

    public void deleteSection(){
        List<Section__c>toDeleteSectionList = new List<Section__c>();
        List<Section__c>SectionList = [select Id,Name from Section__c];
        for(Section__c section:SectionList){
            if(deleteSection.get(section.Id)==true){
                toDeleteSectionList.add(section);
            }
        }
        if(toDeleteSectionList.size()>0){
            delete toDeleteSectionList;
        }
    }

    public void filter(){
        getSections();
    }
}