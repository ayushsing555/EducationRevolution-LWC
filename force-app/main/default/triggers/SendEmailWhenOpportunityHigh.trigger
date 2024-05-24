trigger SendEmailWhenOpportunityHigh on Opportunity (after insert,after update) {
     Set<Id>newOppIds = new Set<Id>();
     for(Opportunity opp:Trigger.new){
        if(opp.Amount>1000000){
            newOppIds.add(opp.Id);
        }
     }
     List<Opportunity>newListOpp = [select Id,Name,Owner.Email ,Amount from Opportunity where Id In :newOppIds];
     NotificationHadler.sendNotification(newListOpp);
}