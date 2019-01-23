FROM java:8

ADD *.jar /ck.jar

ENTRYPOINT ["java","-Dspring.profiles.active=test","-jar","/ck.jar"]

EXPOSE 8899
