cd ..
git clone --progress -v "https://github.com/aboelsoud3/Jumia-Spring.git"
cd Jumia-Spring/
./mvnw clean install
docker build -t jumia/example-app .
cd docker
docker-compose up -d
cd ../../Jumia-Angular
npm install
ng serve --open

