public with sharing class courseHandler {
    @AuraEnabled(cacheable = true)
    public static List<Course__c> getCourses(String CourseName){
        try {
            if(String.isNotBlank(CourseName)){
                return [select Id,Name , Sections__c from Course__c where Name =:CourseName];
            }
            else{
                return [select Id,Name,Sections__c from Course__c];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateCourse(String CourseName,String CourseId){
        try {
           Course__c course = [select Id ,Name from Course__c where Id=:CourseId];
           if(course.Name!=CourseName){
               course.Name = CourseName;
               update course;
           }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteCourse(String recordId){
        try {
            System.debug(recordId);
            Course__c course = [select Id,Name from Course__c where Id =:recordId];
            if(course!=null){
                delete course;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    

    
}