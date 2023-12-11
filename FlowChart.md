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
  G --> |Yes| H[Give User an Award and Mark Topic as Completed]
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
        +Topic currentTopic
        +String[] awards
    }
    ```
````
