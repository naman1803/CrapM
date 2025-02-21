# Backend
This is the backend repository for the springboot backend. You can develop code outside and within the dev container, although working in the container is preferred.

## Working in Dev Container
The directory where all of the files are located are at `/workspace/app/`.

## Linting
Within the dev container, run the following command
```bash
./gradlew :spotlessApply
```
This command will autofix any syntax issues, and display errors for any linting errors it could not fix.

## Testing

There are two ways to run tests:
- Terminal - Using the command 
```bash
./gradlew clean test    
```
will run all of the Junit tests in the backend.