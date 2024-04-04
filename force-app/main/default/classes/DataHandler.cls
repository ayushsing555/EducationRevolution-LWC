public with sharing class DataHandler {
    // createContent method
    public static void createContent() {
        List<String> subtopics = new List<String> {
            'Python Basics',
            'Data Structures',
            'Machine Learning',
            'Web Development',
            'Natural Language Processing',
            'Algorithms',
            'Artificial Intelligence',
            'Database Management',
            'Computer Vision',
            'Cybersecurity',
            'Operating Systems',
            'Cloud Computing',
            'Mobile Development',
            'Software Engineering',
            'Robotics',
            'Internet of Things',
            'Game Development',
            'Blockchain Technology',
            'Quantum Computing',
            'Bioinformatics'
        };

        String[] subtopicDetails = new String[] {
            'Python basics cover fundamental concepts like variables, data types, control flow, functions, modules, and error handling. Python is widely used in various domains including web development, data analysis, artificial intelligence, and scientific computing.',
            'Data structures include lists, dictionaries, sets, and tuples in Python. Understanding data structures is crucial for efficient data manipulation and algorithm design.',
            'Machine learning involves algorithms and models for predictive analytics and pattern recognition. It encompasses supervised learning, unsupervised learning, and reinforcement learning techniques.',
            'Web development encompasses creating websites and web applications using various technologies like HTML, CSS, JavaScript, and backend frameworks such as Django or Flask. It includes frontend development, backend development, and full-stack development.',
            'Natural language processing focuses on understanding and processing human language using computational methods. Applications include sentiment analysis, language translation, chatbots, and text summarization.',
            'Algorithms are step-by-step procedures or formulas for solving problems. They are used in various fields including computer science, mathematics, and engineering to solve optimization, search, and sorting problems.',
            'Artificial intelligence involves creating systems capable of tasks that typically require human intelligence. It encompasses machine learning, natural language processing, computer vision, and robotics.',
            'Database management involves organizing and managing data stored in databases. It includes database design, querying, indexing, and transaction management.',
            'Computer vision deals with enabling computers to interpret and understand visual information. Applications include image recognition, object detection, and facial recognition.',
            'Cybersecurity focuses on protecting computer systems and networks from theft or damage to their hardware, software, or electronic data. It includes network security, cryptography, and security protocols.',
            'Operating systems manage computer hardware and software resources and provide common services for computer programs. They include Windows, macOS, Linux, and Unix-based systems.',
            'Cloud computing provides computing services over the Internet. It includes Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) models.',
            'Mobile development involves creating applications for mobile devices like smartphones and tablets. It includes iOS development using Swift and Android development using Kotlin or Java.',
            'Software engineering focuses on the design, development, and maintenance of software systems. It includes software requirements analysis, software design, coding, testing, and software maintenance.',
            'Robotics involves designing, constructing, operating, and using robots. It includes robot design, sensor integration, motion planning, and robot programming.',
            'Internet of Things (IoT) refers to connecting everyday objects to the internet and allowing them to send and receive data. Applications include smart homes, wearable devices, and industrial automation.',
            'Game development involves designing, developing, and releasing video games. It includes game design, game mechanics, game programming, and game testing.',
            'Blockchain technology is a decentralized, distributed ledger that records transactions across multiple computers. It enables secure and transparent peer-to-peer transactions without the need for intermediaries.',
            'Quantum computing uses quantum bits or qubits to perform calculations. It has the potential to solve complex problems much faster than classical computers.',
            'Bioinformatics applies computational techniques to biological data for analysis and interpretation. It includes sequence analysis, genomic data analysis, and protein structure prediction.'
        };

        List<Content__c> newContentList = new List<Content__c>();

        for(Integer i = 0; i < subtopics.size(); i++) {
            Content__c newContent = new Content__c();
            newContent.Name = subtopics[i];
            newContent.SubContent_Detail__c = subtopicDetails[i];
            newContentList.add(newContent);
        }

        if(!newContentList.isEmpty()) {
            insert newContentList;
        }
    }
    public static void createTopic(){
        List<String>newList = new List<String>{
            'Programming models','Artificial Intelligence','Web Development','Computer Vision','Emerging Technologies'
        };
        List<Topic__c>topicList = new List<Topic__c>();
        for(Integer i  =0;i<newList.size();i++){
            Topic__c topic = new Topic__c();
            topic.Name = newList[i];
            topicList.add(topic);
        }
        if(!topicList.isEmpty()){
            insert topicList;
        }
    }
}
