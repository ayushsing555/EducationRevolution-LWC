public with sharing class visualForceCourseHandler {
    public Map<Id,String>CourseName{get;set;}
    public List<Course__c> courseList{get;set;}
    public Map<Id,boolean>deleteCourseName{get;set;}
    public String name{get;set;}
    public visualForceCourseHandler() {
        CourseName = new Map<Id,String>();
        deleteCourseName = new Map<Id,boolean>();
        String query = '';
        if(name!=null){
            query = 'select Id,Name,Sections__c from Course__c where Name Like \'%'+Name+'%\''; 
        }
        else{
            query = 'select Id,Name,Sections__c from Course__c';
        }
        courseList = Database.query(query);
        System.debug(courseList);
        for(Course__c course:courseList){
            CourseName.put(course.Id,course.Name);
            deleteCourseName.put(course.Id,false);
        }
    }

    public void UpdateCourse(){
        List<Course__c>courseListToUpdate = new List<Course__c>();
        String query = '';
        if(name==null){
            query = 'select Id,Name,Sections__c from Course__c where Name Like \'%'+Name+'%\''; 
        }
        else{
            query = 'select Id,Name,Sections__c from Course__c';
        }
        courseListToUpdate = Database.query(query);
        for(Course__c course:courseListToUpdate){
            course.Name = CourseName.get(course.Id);
        }
        update courseListToUpdate;
        ApexPages.addmessage(new ApexPages.message(ApexPages.severity.Confirm, 'Successfully updated')); 
    }

    public void filter(){
        String query = '';
        if(name!=null){
            query = 'select Id,Name,Sections__c from Course__c where Name Like \'%'+Name+'%\''; 
        }
        else{
            query = 'select Id,Name,Sections__c from Course__c';
        }
        courseList = Database.query(query);
        System.debug(courseList);
        for(Course__c course:courseList){
            CourseName.put(course.Id,course.Name);
        }
    }

    public void deletecourse(){
        List<Course__c>deleteCourseList = [select Id,Name from Course__c];
        List<Course__c>toDeleteList = new List<Course__c>();
        for(Course__c course:deleteCourseList){
            if(deleteCourseName.get(course.Id)){
                toDeleteList.add(course);
            }
        }
        delete toDeleteList;
    }

    
}