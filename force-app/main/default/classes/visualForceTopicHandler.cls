public with sharing class visualForceTopicHandler {
    public Map<Id,String>topicName{get;set;}
    public String name{get;set;}
    public Map<Id,boolean>deletetopic{get;set;}
    public List<Topic__c> getTopics(){
        topicName = new Map<Id,String>();
        deletetopic = new Map<Id,boolean>();
        String Query = '';
        if(name==null) {
            Query = 'select Id,Name  from Topic__c';
        }
        else{
            Query = 'select Id,Name from Topic__c where Name Like \'%'+name+'%\'';
        }
        List<Topic__c>listOftopics = Database.query(Query);
        for(topic__c topic:listOftopics){
            topicName.put(topic.Id,topic.Name);
            deletetopic.put(topic.Id,false);
        }
        return listOftopics;
    }

    public void updatetopic(){
        List<topic__c>updatetopicList = [select Id,Name from topic__c];
        for(topic__c topic:updatetopicList) {
            topic.Name =  topicName.get(topic.Id);
        }
        update updatetopicList;
    }

    public void deleteTopic(){
        List<Topic__c>toDeleteTopicList = new List<Topic__c>();
        List<Topic__c>TopicList = [select Id,Name from Topic__c];
        for(Topic__c topic:TopicList){
            if(deletetopic.get(topic.Id)==true){
                toDeleteTopicList.add(topic);
            }
        }
        if(toDeleteTopicList.size()>0){
            delete toDeleteTopicList;
        }
    }

    public void filter(){
        getTopics();
    }
}