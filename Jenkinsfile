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
                        echo "REACT_APP_S3_ACCESS_KEY=${REACT_APP_S3_ACCESS_KEY_EXT}\nREACT_APP_S3_SECRET_ACCESS_KEY=${REACT_APP_S3_SECRET_ACCESS_KEY_EXT}\nAPI_URL=${API_URL_EXT}" >> .env.production
                        sudo docker build -f Dockerfile -t client .
                        sudo docker container stop client
                        sudo docker container rm client
                        sudo docker run --name client -d -p 81:80 client
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
