public with sharing class NotificationHadler {
    public static void sendNotification(List<Opportunity>oppList){
        List<Messaging.SingleEmailMessage>MessageList = new List<Messaging.SingleEmailMessage>();
        for(Opportunity opp:oppList){
            System.debug(opp);
            System.debug(opp.Owner.Email);
            Messaging.SingleEmailMessage newMessage = new Messaging.SingleEmailMessage();
            String[] address = new String[]{opp.Owner.Email};
            newMessage.setToAddresses(address);
            newMessage.setSubject('Amount high');
            newMessage.setPlainTextBody(
                'Opp Name: '+opp.Name +' opp Amount :'+ opp.Amount+ 'Id: '+opp.Id 
            );
               MessageList.add(newMessage);
            }
            if(!MessageList.isEmpty()){
                Messaging.SendEmailResult[] results = Messaging.sendEmail(MessageList);
            inspectResult(results);
        }
    }
    public static boolean inspectResult(Messaging.SendEmailResult[] results){
            boolean sendResult = true;
            for(Messaging.SendEmailResult result:results){
                if(result.isSuccess()){
                    System.debug('Email sent Successfully');
                }
                else{
                    sendResult = false;
                    System.debug('the errors is '+result.getErrors());
                }
            }
            return sendResult;
        }
}