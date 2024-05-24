public with sharing class visualForceContentHandler {
    public Map<Id,String>contentName{get;set;}
    public String name{get;set;}
    public Map<Id,String>contentDetail{get;set;}
    public Map<Id,boolean>deletecontent{get;set;}
    public List<content__c> getcontents(){
        contentName = new Map<Id,String>();
        deletecontent = new Map<Id,boolean>();
        contentDetail = new Map<Id,String>();
        String Query = '';
        if(name==null) {
            Query = 'select Id,Name,SubContent_Detail__c  from content__c';
        }
        else{
            Query = 'select Id,Name,SubContent_Detail__c from content__c where Name Like \'%'+name+'%\'';
        }
        List<content__c>listOfcontents = Database.query(Query);
        for(content__c content:listOfcontents){
            contentName.put(content.Id,content.Name);
            deletecontent.put(content.Id,false);
            contentDetail.put(content.Id,content.SubContent_Detail__c);
        }
        return listOfcontents;
    }

    public void updatecontent(){
        List<content__c>updatecontentList = [select Id,Name from content__c];
        for(content__c content:updatecontentList) {
            content.Name =  contentName.get(content.Id);
        }
        update updatecontentList;
    }

    public void deletecontent(){
        List<content__c>toDeletecontentList = new List<content__c>();
        List<content__c>contentList = [select Id,Name from content__c];
        for(content__c content:contentList){
            if(deletecontent.get(content.Id)==true){
                toDeletecontentList.add(content);
            }
        }
        if(toDeletecontentList.size()>0){
            delete toDeletecontentList;
        }
    }

    public void filter(){
        getcontents();
    }

    public void updatecontentDetail(){
        List<content__c>updatecontentList = [select Id,Name from content__c];
        for(content__c content:updatecontentList) {
            content.Name =  contentDetail.get(content.Id);
        }
        update updatecontentList;
    }
}