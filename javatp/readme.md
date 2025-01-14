mvn clean package

docker build -t java-docker-app .
docker run --rm java-docker-app

javac -d target/classes src/main/java/*.java
java -cp target/classes Felin
