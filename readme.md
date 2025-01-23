## Endpoints

### 1. Retrieve All Snippets

**`GET /snippets`**

- **Summary:** Fetch all snippets in the database.
- **Responses:**
  - **200 OK**
    - **Description:** A list of code snippets.
    - **Content-Type:** `application/json`
    - **Response Body:**
      ```json
      [
        {
          "id": "string",
          "title": "string",
          "language": "string",
          "createdAt": "date-time",
          "description": "string",
          "content": "string"
        }
      ]
      ```
  - **500 Internal Server Error**
    - **Description:** Failed to retrieve snippets.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```

---

### 2. Create a New Snippet

**`POST /snippets`**

- **Summary:** Add a new snippet.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Required Fields:**
    ```json
    {
      "title": "string",
      "language": "string",
      "description": "string",
      "content": "string"
    }
    ```
- **Responses:**
  - **201 Created**
    - **Description:** Snippet created successfully.
    - **Response Body:**
      ```json
      {
        "id": "string",
        "title": "string",
        "language": "string",
        "createdAt": "date-time",
        "description": "string",
        "content": "string"
      }
      ```
  - **500 Internal Server Error**
    - **Description:** Failed to create snippet.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```

---

### 3. Retrieve a Snippet by ID

**`GET /snippets/{id}`**

- **Summary:** Retrieve details of a specific snippet by ID.
- **Path Parameters:**
  - `id` (string): The unique identifier of the snippet.
- **Responses:**
  - **200 OK**
    - **Description:** Snippet retrieved successfully.
    - **Response Body:**
      ```json
      {
        "id": "string",
        "title": "string",
        "language": "string",
        "createdAt": "date-time",
        "description": "string",
        "content": "string"
      }
      ```
  - **404 Not Found**
    - **Description:** Snippet not found.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```
  - **500 Internal Server Error**
    - **Description:** Failed to retrieve snippet.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```

---

### 4. Update a Snippet by ID

**`PATCH /snippets/{id}`**

- **Summary:** Update fields of a specific snippet by ID.
- **Path Parameters:**
  - `id` (string): The unique identifier of the snippet.
- **Request Body:**
  - **Content-Type:** `application/json`
  - **Fields to Update:**
    ```json
    {
      "title": "string",
      "language": "string",
      "description": "string",
      "content": "string"
    }
    ```
- **Responses:**
  - **200 OK**
    - **Description:** Snippet updated successfully.
    - **Response Body:**
      ```json
      {
        "updatedSnippet": {
          "id": "string",
          "title": "string",
          "language": "string",
          "createdAt": "date-time",
          "description": "string",
          "content": "string"
        }
      }
      ```
  - **404 Not Found**
    - **Description:** Snippet not found.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```
  - **500 Internal Server Error**
    - **Description:** Failed to update snippet.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```

---

### 5. Delete a Snippet by ID

**`DELETE /snippets/{id}`**

- **Summary:** Delete a specific snippet by ID.
- **Path Parameters:**
  - `id` (string): The unique identifier of the snippet.
- **Responses:**
  - **200 OK**
    - **Description:** Snippet deleted successfully.
    - **Response Body:**
      ```json
      { "message": "Snippet deleted successfully" }
      ```
  - **404 Not Found**
    - **Description:** Snippet not found.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```
  - **500 Internal Server Error**
    - **Description:** Failed to delete snippet.
    - **Response Body:**
      ```json
      { "error": "string" }
      ```

---

## Components

### 1. Snippet Object

- **Properties:**
  - `id` (string): Unique identifier for the snippet.
  - `title` (string)
  - `language` (string)
  - `createdAt` (date-time)
  - `description` (string)
  - `content` (
