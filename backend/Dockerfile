##  Start with a base image from Eclipse Temurin (a distribution of OpenJDK) with Alpine 
FROM eclipse-temurin:21-jammy AS build
WORKDIR /workspace/app


## Copy neccessary files for building the java project
COPY gradlew .
RUN chmod +x ./gradlew

COPY gradle/wrapper/gradle-wrapper.properties ./gradle/wrapper/gradle-wrapper.properties
COPY gradle/wrapper/gradle-wrapper.jar ./gradle/wrapper/gradle-wrapper.jar
COPY config/checkstyle/checkstyle.xml ./config/checkstyle/checkstyle.xml
COPY config/checkstyle/suppressions.xml ./config/checkstyle/suppressions.xml

COPY build.gradle .

COPY src src
COPY ./.vscode ./.vscode
COPY ./README.md ./README.md

## Setup Enviromental Variable for Testing development


## Ensure the Gradle Wrapper script is executable
## Use Gradle to build the application using the RUN stanza

FROM build AS integration

COPY --from=mocks h2.sql ./src/main/resources/data.sql
RUN ./gradlew assemble

ENTRYPOINT ["java","-jar","build/libs/waterwise-app-1.0.jar"]

FROM build AS development

## need to add a command to run the app here
RUN ./gradlew assemble

ENTRYPOINT ["java","-jar","build/libs/waterwise-app-1.0.jar"]

## have this here because I was debugging the jar file
## Add a command to run a shell in interactive mode when the container starts
#CMD ["/bin/sh"]