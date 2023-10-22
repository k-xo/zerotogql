# zerotogql

+---------------------+
|     User (UI)       |
+---------------------+
           |
           | GraphQL Schema
           V
+---------------------+
| Backend Express API |<------------------+
+---------------------+                   |
           |                             |
           | Save schema to `.graphql`   |
           V                             |
+---------------------+                   |
|    File System      |                   |
+---------------------+                   |
           |                             |
           | Start Docker container      |
           V                             |
+---------------------+                   |
|   Docker Container  |<--------+         |
+---------------------+         |         |
           |                     |         |
           | Generate subdomain |         |
           V                     |         |
+---------------------+         |         |
| uniqueNamesGenerator|         |         |
+---------------------+         |         |
           |                     |         |
           | Update Nginx Config|         |
           V                     V         |
+---------------------+   +---------------------+
|       Nginx         |   |      Nginx File     |
+---------------------+   +---------------------+
           |                           |
           | Respond to User with URL  |
           V                           |
+---------------------+<----------------+
|        User         |
+---------------------+
