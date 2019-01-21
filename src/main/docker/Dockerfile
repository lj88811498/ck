FROM java:8

ADD *.jar /nncloud.jar

ENTRYPOINT ["java","-Dspring.profiles.active=test","-jar","/nncloud.jar"]

EXPOSE 8899
