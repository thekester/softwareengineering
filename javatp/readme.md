mvn clean package

docker build -t java-docker-app .
docker run --rm java-docker-app

javac -d target/classes javatp/src/main/java/javatp/*.java
java -cp target/classes Felin