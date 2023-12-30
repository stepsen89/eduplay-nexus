```mermaid

graph TB
  A[User Signs In] --> B{Auth with email
  address exists?}
  B --> |Yes| C[Set response in AuthContext]
  B --> |No| D[UI Error Warning 'User does not exist']
  C --> E[Request User Data]
  E --> F{User Document Exists?}
  F --> |Yes| G[Return User Data]
  F --> |No| H[Create New Document with Base User Info]

```

```mermaid

graph TB
  A[User Answers a Question] --> B[GPT request]
  B --> |200| C[Add Points to User]
  B --> |500| D[Route to error page, current technical issue]
  C --> E{GPT response evaluates
  code answer as okay
  areasToImprove.length === 0?}
  E --> |Yes| F[Add to Awarded Field in Progress for this Module]
  E --> |No| J[Display Explanation]
  F --> G{Awarded Field > 5?}
  G --> |Yes| H[Give User an Award and Mark Module as Completed]
  G --> |No| I[Do Nothing]
  J --> K[User Continues to Next Question]
```

````mermaid

classDiagram
    class UserData {
        +ProgressType variables
        +ProgressType functions
        +ProgressType objects
        +ProgressType arrays
        +Number totalChallenges
        +Number points
        +Module currentModule
        +String[] awards
    }

````

```mermaid
flowchart TD
    A[Start] --> B[Display Registration Page]
    B --> C[User Enters Registration Details]
    C --> D{Validate Details}
    D -->|Invalid| C
    D -->|Valid| F[Create User Account]
    F --> G[Display Login Page]
    G --> H[User Enters Login Credentials]
    H --> I{Check Credentials}
    I -->|Incorrect| H
    I -->|Correct| K[Grant Access to Application]
    K --> L[End]
```

flow

```mermaid
graph TB
  A[User sees challenge] --> B[User submits code solution]
  B --> C[Send answer to GPT]
  C --> D[GPT returns a response containing points, followupQuestions, labels]
  D --> E[Display response for the user]
```

Sequence diagram

```mermaid
sequenceDiagram
  participant User
  participant System
  participant GPT
  User->>System: Sees challenge
  User->>System: Submits code solution
  System->>GPT: Prompt with question, given answer and topic
  GPT-->>System: Response (points, follow up questions, labels, feedback)
  System->>User: displays feedback and points
```

Database visualisation

```mermaid

graph TB
  Database(Firestore Database)
  Users(users)
  GPTPath(gpt-path)
  UserDoc(user-id1)
  UserDoc2(user-id2)
  UserDoc3(user-id3)
  GPTDoc(user-id1)
  GPTDoc2(user-id2)
  GPTDoc3(user-id3)
  Database --> Users
  Database --> GPTPath
  Users --> UserDoc
  Users --> UserDoc2
  Users --> UserDoc3
  GPTPath --> GPTDoc
  GPTPath --> GPTDoc2
  GPTPath --> GPTDoc3
```

```mermaid
  classDiagram

  class User {
    userId: string
    arrays: ProgressType
    awards: Award[]
    currentModule: Module
  }

  class ProgressType {
    awarded: number
    completed: boolean
  }

  class Award {
    value: string
  }
  class Module {
    value: string
  }

```
