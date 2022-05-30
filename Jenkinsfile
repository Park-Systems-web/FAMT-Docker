pipeline {
    agent any
    stages {
        stage('prepare') {
            steps {
                echo 'prepare'
                 git branch: "main", credentialsId: "famt-git-credential", url: 'https://github.com/Park-Systems-web/FAMT-Docker.git'
                 sh  'ls -al'
            }
        }
        stage('client-deploy') {
            steps {
                    dir('client'){
                        sh '''
                        ls -al
                        sudo echo 'REACT_APP_S3_ACCESS_KEY="${REACT_APP_S3_ACCESS_KEY_EXT}"\nREACT_APP_S3_SECRET_ACCESS_KEY="${REACT_APP_S3_SECRET_ACCESS_KEY_EXT}"\nAPI_URL="${API_URL_EXT}"' >> .env.production
                        sudo docker build -f Dockerfile -t client .
                        sudo docker container stop client
                        sudo docker container rm client
                        sudo docker run --name client -d -p 81:80 client
                        '''
                }
            }
        }
        stage('server-deploy') {
            steps {
                    dir('server'){
                        sh '''
                        ls -al
                        sudo docker build -f Dockerfile -t server .
                        sudo docker container stop server
                        sudo docker container rm server
                        sudo docker run --name server -d -p 5001:5000 server
                        '''
                    }
            }
        }
        stage('cleanup') {
            steps {
              sh '''
              sudo docker rmi $(sudo docker images -f "dangling=true" -q)
              '''
            }
        }

    }
}
